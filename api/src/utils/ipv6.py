"""Module for IPv6 utilities."""

def simplify(ipv6: str) -> str:
    """Simplify an IPv6 address.

    Args:
        ipv6 (str): The IPv6 address to simplify.

    Returns:
        str: The simplified IPv6 address.

    """
    parts = ipv6.split(":")
    for part in parts:
        if part == "0000":
            parts[parts.index(part)] = "0"

    is_zero = False
    if ipv6.find("::") != -1:
        is_zero = True
    i = 0
    while i < len(parts):
        part = parts[i]
        if part == "0":
            parts.pop(i)
            is_zero = True
        elif is_zero:
            parts.insert(i, "")
            i = len(parts) # break
        else:
            i += 1

    return ":".join(parts)

def extend(ipv6: str) -> str:
    """Extend an IPv6 address.

    Args:
        ipv6 (str): The IPv6 address to extend.

    Returns:
        str: The extended IPv6 address.

    """
    parts = ipv6.split(":")
    i = 0
    while i < len(parts):
        if parts[i] == "":
            parts[i] = "0000"
            for _j in range(8 - len(parts)):
                parts.insert(i, "0000")
            i += 8 - len(parts)
        elif parts[i] == "0":
            parts[i] = "0000"
            i += 1
        else:
            i += 1

    return ":".join(parts)
