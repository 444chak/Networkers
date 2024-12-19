"""Module for IPv6 utilities."""
def simplify(ipv6: str) -> str:
    """Simplify an IPv6 address.

    Args:
        ipv6 (str): The IPv6 address to simplify.

    Returns:
        str: The simplified IPv6 address.

    """
    # Split the address into its groups
    groups = ipv6.split(":")
    
    # Step 1: Remove leading zeros in each group
    groups = [group.lstrip("0") or "0" for group in groups]
    
    # Step 2: Identify the longest run of consecutive "0" groups
    zero_runs = []
    current_start = None
    for i, group in enumerate(groups):
        if group == "0":
            if current_start is None:
                current_start = i
        else:
            if current_start is not None:
                zero_runs.append((current_start, i - 1))
                current_start = None
    if current_start is not None:
        zero_runs.append((current_start, len(groups) - 1))
    
    # Find the longest run of zeros
    if zero_runs:
        longest_run = max(zero_runs, key=lambda run: run[1] - run[0])
    else:
        longest_run = None
    
    # Step 3: Replace the longest run of zeros with "::"
    if longest_run:
        start, end = longest_run
        groups = groups[:start] + [""] + groups[end + 1:]
    
    # Step 4: Reconstruct the compressed address
    compressed_address = ":".join(groups)
    
    # Ensure "::" is not accidentally replaced multiple times
    compressed_address = compressed_address.replace(":::", "::")
    
    return compressed_address
def extend(ipv6: str) -> str:
    """Extend an IPv6 address.

    Args:
        ipv6 (str): The IPv6 address to extend.

    Returns:
        str: The extended IPv6 address.

    """
    if "::" in ipv6:
        parts = ipv6.split("::")
        left = parts[0].split(":") if parts[0] else []
        right = parts[1].split(":") if len(parts) > 1 and parts[1] else []
        
        # Calculate the number of groups needed to fill the gap
        num_zeros_to_add = 8 - (len(left) + len(right))
        middle = ["0000"] * num_zeros_to_add
        
        # Combine all parts into a full address
        full_address = left + middle + right
    else:
        # If no "::", simply split by ":" for expansion
        full_address = ipv6.split(":")
    
    # Step 2: Pad each group to 4 digits
    expanded_address = [group.zfill(4) for group in full_address]
    
    # Step 3: Join the groups with ":"
    return ":".join(expanded_address)
