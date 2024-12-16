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
