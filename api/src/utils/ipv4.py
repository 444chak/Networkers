"""Module for IPv4 utilities."""


def is_valid(address: str) -> bool:
    """Check if an IPv4 address is valid.

    Args:
        address (str): A string representing the IPv4 address (e.g., "192.168.1.1").

    Returns:
        bool: True if the address is valid, False otherwise.

    """
    octets = address.split(".")

    if len(octets) != 4:  # noqa: PLR2004
        return False

    for octet in octets:
        if not octet.isdigit() or not (0 <= int(octet) <= 255):  # noqa: PLR2004
            return False

    return True


def ipv4_class(address: str) -> str:
    """Determine the class A, B, or C of an IPv4 address.

    Args:
        address (str): A string representing the IPv4 address (e.g., "192.168.1.1").

    Returns:
        str: A string indicating the class of the address (A, B, or C)
            or an error message if the address is invalid.

    """
    if not is_valid(address):
        return False
    octets = address.split(".")
    first_octet = int(octets[0])

    if 0 <= first_octet <= 127:  # noqa: PLR2004
        return "Class A"
    if 128 <= first_octet <= 191:  # noqa: PLR2004
        return "Class B"
    if 192 <= first_octet <= 223:  # noqa: PLR2004
        return "Class C"

    return "The address does not belong to classes A, B, or C"


def dec_to_bin(address: str) -> str:
    """Convert an IPv4 address from decimal notation to binary notation.

    Args:
        address (str): A string representing the IPv4 address (e.g., "192.168.1.1").

    Returns:
        str: A string containing the IPv4 address in binary notation
            (e.g., "11000000.10101000.00000001.00000001")
             or an error message if the address is invalid.

    """
    if not is_valid(address):
        return "Adresse IPv4 invalide"

    octets = address.split(".")

    binary_octets = [f"{int(octet):08b}" for octet in octets]

    return ".".join(binary_octets)


def dec_to_hex(address: str) -> str:
    """Convert an IPv4 address from decimal notation to hexadecimal notation.

    Args:
        address (str): A string representing the IPv4 address (e.g., "192.168.1.1").

    Returns:
        str: A string containing the IPv4 address in hexadecimal notation
            (e.g., "C0.A8.01.01")
             or an error message if the address is invalid.

    """
    if not is_valid(address):
        return "Adresse IPv4 invalide"

    octets = address.split(".")

    hex_octets = [f"{int(octet):02X}" for octet in octets]

    return ".".join(hex_octets)


def hex_to_dec(address: str) -> str:
    """Convert an IPv4 address from hexadecimal notation to decimal notation.

    Args:
        address (str): A string representing the IPv4 address in hexadecimal notation
            (e.g., "C0.A8.01.01").

    Returns:
        str: A string containing the IPv4 address in decimal notation
            (e.g., "192.168.1.1"),
             or an error message if the address is invalid.

    """
    octets = address.split(".")

    if len(octets) != 4:  # noqa: PLR2004
        return "Adresse IPv4 invalide"

    try:
        decimal_octets = [str(int(octet, 16)) for octet in octets]
    except ValueError:
        return "Adresse IPv4 invalide"

    return ".".join(decimal_octets)


def bin_to_dec(address: str) -> str:
    """Convert an IPv4 address from binary notation to decimal notation.

    Args:
        address (str): A string representing the IPv4 address in binary notation
            (e.g., "11000000.10101000.00000001.00000001").

    Returns:
        str: A string containing the IPv4 address in decimal notation
            (e.g., "192.168.1.1"),
             or an error message if the address is invalid.

    """
    octets = address.split(".")

    if len(octets) != 4:  # noqa: PLR2004
        return "Adresse IPv4 invalide"

    try:
        decimal_octets = [str(int(octet, 2)) for octet in octets]
    except ValueError:
        return "Adresse IPv4 invalide"

    return ".".join(decimal_octets)


def ipv4_to_cidr(address: str, mask: str) -> str:
    """Convert an IPv4 address to CIDR notation.

    Args:
        address (str): A string representing the IPv4 address (e.g., "192.168.1.1").
        mask (str): A string representing the subnet mask (e.g., "255.255.255.0").

    Returns:
        str: A string representing the IPv4 address in CIDR notation
            (e.g., "192.168.1.1/24"),
             or an error message if the address or mask is invalid.

    """
    if not is_valid(address):
        return "Adresse IPv4 invalide"

    binary_mask = "".join([f"{int(octet):08b}" for octet in mask.split(".")])
    ones_count = binary_mask.count("1")

    return f"{address}/{ones_count}"


def get_ipv4_mask(cidr: str) -> str:
    """Calculate the subnet mask from an IPv4 address in CIDR notation.

    Args:
        cidr (str): A string representing an IPv4 address in CIDR notation
            (e.g., "192.168.1.1/24").

    Returns:
        str: A string representing the subnet mask (e.g., "255.255.255.0"),
             or an error message if the input is invalid.

    """
    if "/" not in cidr:
        return "Invalid CIDR notation"

    try:
        address, prefix = cidr.split("/")
        prefix = int(prefix)
    except ValueError:
        return "Invalid CIDR notation"

    if not is_valid(address) or not (0 <= prefix <= 32):  # noqa: PLR2004
        return "Invalid IPv4 address or CIDR prefix"

    binary_mask = "1" * prefix + "0" * (32 - prefix)

    mask_octets = [int(binary_mask[i : i + 8], 2) for i in range(0, 32, 8)]

    return ".".join(map(str, mask_octets))


def vlsm(base_ip: str, subnets: str) -> str:
    """Implement the VLSM (Variable Length Subnet Mask) technique.

    Args:
        base_ip (str): The base IPv4 network address (e.g., "192.168.1.0").
        subnets (str): A list of integers representing the number of required hosts
            for each subnet.

    Returns:
        str: A list of dictionaries containing subnet details: network, mask, broadcast,
            and usable range.

    """
    if not is_valid(base_ip):
        return "Invalid base IP address"

    # Check if any subnet requires more than 255 machines
    if any(hosts > 255 for hosts in subnets):  # noqa: PLR2004
        return "Error: Each subnet can only accommodate up to 255 machines."

    # Sort subnets in descending order (to allocate the largest first)
    subnets.sort(reverse=True)
    results = []

    # Helper functions to convert between IP addresses and integers
    def ip_to_int(ip: str) -> int:
        """Convert an IPv4 address to an integer.

        Args:
            ip (str): ipv4 address

        Returns:
            int: The integer representation of the IPv4 address.

        """
        octets = list(map(int, ip.split(".")))
        return (octets[0] << 24) + (octets[1] << 16) + (octets[2] << 8) + octets[3]

    def int_to_ip(ip_int: int) -> str:
        """Convert an integer to an IPv4 address.

        Args:
            ip_int (int): Integer representation of an IPv4 address.

        Returns:
            str: IPv4 address.

        """
        return ".".join([str((ip_int >> (8 * i)) & 255) for i in range(3, -1, -1)])

    current_ip_int = ip_to_int(base_ip)

    for hosts in subnets:
        # Total addresses needed (including network and broadcast addresses)
        total_addresses = hosts + 2

        # Calculate the CIDR prefix (number of network bits)
        prefix = 32 - (total_addresses - 1).bit_length()

        # Calculate network and broadcast addresses
        network_ip = current_ip_int
        broadcast_ip = network_ip + (1 << (32 - prefix)) - 1

        # Check for valid IPv4 address range
        if broadcast_ip > 0xFFFFFFFF:  # noqa: PLR2004
            msg = "Out of IPv4 address range"
            raise ValueError(msg)

        # Append the results to the list
        results.append(
            {
                "network": int_to_ip(network_ip),
                "mask": get_ipv4_mask(f"0.0.0.0/{prefix}"),
                "broadcast": int_to_ip(broadcast_ip),
                "range": f"{int_to_ip(network_ip + 1)} - {int_to_ip(broadcast_ip - 1)}",
            },
        )

        # Move to the next subnet's network address
        current_ip_int = broadcast_ip + 1

    return results
