def est_valide(adresse):
    """
    Vérifie si une adresse IPv4 est valide.
    
    :param adresse: Une chaîne de caractères représentant l'adresse IPv4 (par exemple "192.168.1.1").
    :return: True si l'adresse est valide, False sinon.
    """
    octets = adresse.split('.')
    
    if len(octets) != 4:
        return False
    
    for octet in octets:
        if not octet.isdigit() or not (0 <= int(octet) <= 255):
            return False
    
    return True


def classe_ipv4(adresse):
    """
    Détermine la classe A, B ou C d'une adresse IPv4.
    
    :param adresse: Une chaîne de caractères représentant l'adresse IPv4 (par exemple "192.168.1.1").
    :return: Une chaîne indiquant la classe de l'adresse (A, B ou C) ou un message d'erreur si l'adresse est invalide.
    """
    if not (est_valide(adresse)):
        return False
    octets = adresse.split('.')
    premier_octet = int(octets[0])
    
    if 0 <= premier_octet <= 127:
        return "Classe A"
    elif 128 <= premier_octet <= 191:
        return "Classe B"
    elif 192 <= premier_octet <= 223:
        return "Classe C"
    else:
        return "L'adresse ne fait pas partie des classes A, B ou C"
    
def dec_to_bin(adresse):
    """
    Convertit une adresse IPv4 de notation décimale en notation binaire.
    
    :param adresse: Une chaîne de caractères représentant l'adresse IPv4 (par exemple "192.168.1.1").
    :return: Une chaîne contenant l'adresse IPv4 en binaire (ex : "11000000.10101000.00000001.00000001")
             ou un message d'erreur si l'adresse est invalide.
    """
    # Vérifier si l'adresse est valide
    if not est_valide(adresse):
        return "Adresse IPv4 invalide"
    
    # Diviser l'adresse en octets
    octets = adresse.split('.')
    
    # Convertir chaque octet en binaire avec 8 bits
    octets_binaires = [f"{int(octet):08b}" for octet in octets]
    
    # Joindre les octets binaires avec des points
    return '.'.join(octets_binaires)

def dec_to_hex(adresse):
    """
    Convertit une adresse IPv4 de notation décimale en notation hexadécimale.
    
    :param adresse: Une chaîne de caractères représentant l'adresse IPv4 (par exemple "192.168.1.1").
    :return: Une chaîne contenant l'adresse IPv4 en hexadécimal (ex : "C0.A8.01.01")
             ou un message d'erreur si l'adresse est invalide.
    """
    # Vérifier si l'adresse est valide
    if not est_valide(adresse):
        return "Adresse IPv4 invalide"
    
    # Diviser l'adresse en octets
    octets = adresse.split('.')
    
    # Convertir chaque octet en hexadécimal (2 caractères)
    octets_hex = [f"{int(octet):02X}" for octet in octets]
    
    # Joindre les octets hexadécimaux avec des points
    return '.'.join(octets_hex)

def hex_to_dec(adresse):
    """
    Convertit une adresse IPv4 de notation hexadécimale en notation décimale.
    
    :param adresse_hex: Une chaîne de caractères représentant l'adresse IPv4 en hexadécimal (ex : "C0.A8.01.01").
    :return: Une chaîne contenant l'adresse IPv4 en notation décimale (ex : "192.168.1.1"),
             ou un message d'erreur si l'adresse est invalide.
    """
    # Diviser l'adresse en octets
    octets = adresse.split('.')
    
    # Vérifier qu'il y a exactement 4 octets
    if len(octets) != 4:
        return "Adresse IPv4 hexadécimale invalide"
    
    # Convertir chaque octet hexadécimal en décimal
    try:
        octets_decimaux = [str(int(octet, 16)) for octet in octets]
    except ValueError:
        return "Adresse IPv4 hexadécimale invalide"
    
    # Joindre les octets en notation décimale
    return '.'.join(octets_decimaux)

def bin_to_dec(adresse):
    """
    Convertit une adresse IPv4 de notation binaire en notation décimale.
    
    :param adresse_bin: Une chaîne de caractères représentant l'adresse IPv4 en binaire (ex : "11000000.10101000.00000001.00000001").
    :return: Une chaîne contenant l'adresse IPv4 en notation décimale (ex : "192.168.1.1"),
             ou un message d'erreur si l'adresse est invalide.
    """
    # Diviser l'adresse en octets
    octets = adresse.split('.')
    
    # Vérifier qu'il y a exactement 4 octets
    if len(octets) != 4:
        return "Adresse IPv4 binaire invalide"
    
    # Convertir chaque octet binaire en décimal
    try:
        octets_decimaux = [str(int(octet, 2)) for octet in octets]
    except ValueError:
        return "Adresse IPv4 binaire invalide"
    
    # Joindre les octets en notation décimale
    return '.'.join(octets_decimaux)

def ipv4_to_cidr(adresse, masque):
    """
    Écrit une adresse IPv4 en notation CIDR.
    
    :param adresse: Une chaîne de caractères représentant l'adresse IPv4 (par exemple "192.168.1.1").
    :param masque: Une chaîne de caractères représentant le masque de sous-réseau (par exemple "255.255.255.0").
    :return: Une chaîne représentant l'adresse IPv4 en notation CIDR (par exemple "192.168.1.1/24"),
             ou un message d'erreur si l'adresse ou le masque est invalide.
    """
    if not est_valide(adresse):
        return "Adresse invalide"
    
    masque_binaire = ''.join([f"{int(octet):08b}" for octet in masque.split('.')])
    bits_a_1 = masque_binaire.count('1')
    
    return f"{adresse}/{bits_a_1}"

def get_masque_ipv4(cidr):
    """
    Calcule le masque de sous-réseau à partir d'une adresse IPv4 en notation CIDR.
    
    :param cidr: Une chaîne de caractères représentant une adresse IPv4 en notation CIDR (par exemple "192.168.1.1/24").
    :return: Une chaîne représentant le masque de sous-réseau (par exemple "255.255.255.0"),
             ou un message d'erreur si l'entrée est invalide.
    """
    if '/' not in cidr:
        return "Notation CIDR invalide"
    
    try:
        adresse, prefixe = cidr.split('/')
        prefixe = int(prefixe) 
    except ValueError:
        return "Notation CIDR invalide"
    
    if not est_valide(adresse) or not (0 <= prefixe <= 32):
        return "Adresse IPv4 ou préfixe CIDR invalide"
    
    masque_binaire = '1' * prefixe + '0' * (32 - prefixe)
    
    masque_octets = [int(masque_binaire[i:i+8], 2) for i in range(0, 32, 8)]
    
    masque = '.'.join(map(str, masque_octets))
    
    return masque
