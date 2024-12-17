def is_valid(address):
    """
    Checks if an IPv4 address is valid.
    
    :param address: A string representing the IPv4 address (e.g., "192.168.1.1").
    :return: True if the address is valid, False otherwise.
    """
    octets = address.split('.')
    
    if len(octets) != 4:
        return False
    
    for octet in octets:
        if not octet.isdigit() or not (0 <= int(octet) <= 255):
            return False
    
    return True

def ipv4_class(address):
    """
    Determines the class A, B, or C of an IPv4 address.
    
    :param address: A string representing the IPv4 address (e.g., "192.168.1.1").
    :return: A string indicating the class of the address (A, B, or C) or an error message if the address is invalid.
    """
    if not is_valid(address):
        return False
    octets = address.split('.')
    first_octet = int(octets[0])
    
    if 0 <= first_octet <= 127:
        return "Class A"
    elif 128 <= first_octet <= 191:
        return "Class B"
    elif 192 <= first_octet <= 223:
        return "Class C"
    else:
        return "The address does not belong to classes A, B, or C"
    
def dec_to_bin(address):
    """
    Converts an IPv4 address from decimal notation to binary notation.
    
    :param address: A string representing the IPv4 address (e.g., "192.168.1.1").
    :return: A string containing the IPv4 address in binary notation (e.g., "11000000.10101000.00000001.00000001")
             or an error message if the address is invalid.
    """
    if not is_valid(address):
        return "Invalid IPv4 address"
    
    octets = address.split('.')
    
    binary_octets = [f"{int(octet):08b}" for octet in octets]
    
    return '.'.join(binary_octets)

def dec_to_hex(address):
    """
    Converts an IPv4 address from decimal notation to hexadecimal notation.
    
    :param address: A string representing the IPv4 address (e.g., "192.168.1.1").
    :return: A string containing the IPv4 address in hexadecimal notation (e.g., "C0.A8.01.01")
             or an error message if the address is invalid.
    """
    if not is_valid(address):
        return "Invalid IPv4 address"
    
    octets = address.split('.')
    
    hex_octets = [f"{int(octet):02X}" for octet in octets]
    
    return '.'.join(hex_octets)

def hex_to_dec(address):
    """
    Converts an IPv4 address from hexadecimal notation to decimal notation.
    
    :param address: A string representing the IPv4 address in hexadecimal notation (e.g., "C0.A8.01.01").
    :return: A string containing the IPv4 address in decimal notation (e.g., "192.168.1.1"),
             or an error message if the address is invalid.
    """
    octets = address.split('.')
    
    if len(octets) != 4:
        return "Invalid hexadecimal IPv4 address"
    
    try:
        decimal_octets = [str(int(octet, 16)) for octet in octets]
    except ValueError:
        return "Invalid hexadecimal IPv4 address"
    
    return '.'.join(decimal_octets)

def bin_to_dec(address):
    """
    Converts an IPv4 address from binary notation to decimal notation.
    
    :param address: A string representing the IPv4 address in binary notation (e.g., "11000000.10101000.00000001.00000001").
    :return: A string containing the IPv4 address in decimal notation (e.g., "192.168.1.1"),
             or an error message if the address is invalid.
    """
    octets = address.split('.')
    
    if len(octets) != 4:
        return "Invalid binary IPv4 address"
    
    try:
        decimal_octets = [str(int(octet, 2)) for octet in octets]
    except ValueError:
        return "Invalid binary IPv4 address"
    
    return '.'.join(decimal_octets)

def ipv4_to_cidr(address, mask):
    """
    Converts an IPv4 address to CIDR notation.
    
    :param address: A string representing the IPv4 address (e.g., "192.168.1.1").
    :param mask: A string representing the subnet mask (e.g., "255.255.255.0").
    :return: A string representing the IPv4 address in CIDR notation (e.g., "192.168.1.1/24"),
             or an error message if the address or mask is invalid.
    """
    if not is_valid(address):
        return "Invalid address"
    
    binary_mask = ''.join([f"{int(octet):08b}" for octet in mask.split('.')])
    ones_count = binary_mask.count('1')
    
    return f"{address}/{ones_count}"

def get_ipv4_mask(cidr):
    """
    Calculates the subnet mask from an IPv4 address in CIDR notation.
    
    :param cidr: A string representing an IPv4 address in CIDR notation (e.g., "192.168.1.1/24").
    :return: A string representing the subnet mask (e.g., "255.255.255.0"),
             or an error message if the input is invalid.
    """
    if '/' not in cidr:
        return "Invalid CIDR notation"
    
    try:
        address, prefix = cidr.split('/')
        prefix = int(prefix) 
    except ValueError:
        return "Invalid CIDR notation"
    
    if not is_valid(address) or not (0 <= prefix <= 32):
        return "Invalid IPv4 address or CIDR prefix"
    
    binary_mask = '1' * prefix + '0' * (32 - prefix)
    
    mask_octets = [int(binary_mask[i:i+8], 2) for i in range(0, 32, 8)]
    
    mask = '.'.join(map(str, mask_octets))
    
    return mask

def vlsm(base_ip, subnets):
    """
    Implements the VLSM (Variable Length Subnet Mask) technique.

    :param base_ip: The base IPv4 network address (e.g., "192.168.1.0").
    :param subnets: A list of integers representing the number of required hosts for each subnet.
    :return: A list of dictionaries containing subnet details: network, mask, broadcast, and usable range.
    """
    if not is_valid(base_ip):
        return "Invalid base IP address"

    # Sort subnets in descending order (to allocate the largest first)
    subnets.sort(reverse=True)
    results = []

    # Helper functions to convert between IP addresses and integers
    def ip_to_int(ip):
        octets = list(map(int, ip.split('.')))
        return (octets[0] << 24) + (octets[1] << 16) + (octets[2] << 8) + octets[3]

    def int_to_ip(ip_int):
        return '.'.join([str((ip_int >> (8 * i)) & 255) for i in range(3, -1, -1)])

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
        if broadcast_ip > 0xFFFFFFFF:
            raise ValueError("Out of IPv4 address range")

        # Append the results to the list
        results.append({
            'network': int_to_ip(network_ip),
            'mask': get_ipv4_mask(f"0.0.0.0/{prefix}"),
            'broadcast': int_to_ip(broadcast_ip),
            'range': f"{int_to_ip(network_ip + 1)} - {int_to_ip(broadcast_ip - 1)}"
        })

        # Move to the next subnet's network address
        current_ip_int = broadcast_ip + 1

    return results

# Example usage
base_ip = "192.168.1.0"
subnet_hosts = [50, 20, 10]
subnets = vlsm(base_ip, subnet_hosts)

for i, subnet in enumerate(subnets):
    print(f"Subnet {i+1}: {subnet}")
