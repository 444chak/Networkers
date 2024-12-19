# :satellite: NetWorkers API

**Table of contents**  

- [Routes](#routes)
  - [Auth](#auth)
    - [Login](#login)
    - [Register](#register)
    - [Refresh token](#refresh-token)
  - [Users](#users)
    - [Get all users](#get-all-users)
    - [Get user by username](#get-user-by-username)
    - [Get own user](#get-own-user)
    - [Update user](#update-user)
    - [Update own user](#update-own-user)
    - [Update user password](#update-user-password)
    - [Delete user](#delete-user)
  - [IPv4](#ipv4)
    - [Get IPv4 class](#get-ipv4-class)
    - [Convert dec to bin](#convert-dec-to-bin)
    - [Convert dec to hex](#convert-dec-to-hex)
    - [Convert hex to dec](#convert-hex-to-dec)
    - [Convert bin to dec](#convert-bin-to-dec)
    - [Get CIDR notation](#get-cidr-notation)
    - [Get mask](#get-mask)
    - [Get VLSM](#get-vlsm)
  - [IPv6](#ipv6)
    - [Simplify IPv6](#simplify-ipv6)
    - [Extend IPv6](#extend-ipv6)
  - [Scapy](#scapy)
    - [Create ethernet frame](#create-ethernet-frame)
    - [TCP test](#tcp-test)
    - [Ping](#ping)
    - [Get interfaces](#get-interfaces)

## Routes

### Auth

#### Login

| Method | URL         | Description | Need token | Roles |
| ------ | ----------- | ----------- | ---------- | ----- |
| POST   | /auth/login | Login       | False      | None  |

**Request**  

```json
{
  "username": "string",
  "password": "string"
}
```

#### Register

| Method | URL            | Description | Need token | Roles |
| ------ | -------------- | ----------- | ---------- | ----- |
| POST   | /auth/register | Register    | False      | None  |

**Request**  

```json
{
  "username": "string",
  "password": "string"
}
```

#### Refresh token

| Method | URL           | Description   | Need token | Roles |
| ------ | ------------- | ------------- | ---------- | ----- |
| POST   | /auth/refresh | Refresh token | False      | None  |

**Request**  

```json
{
  "refresh_token": "string"
}
```

### Users

#### Get all users

| Method | URL    | Description   | Need token | Roles |
| ------ | ------ | ------------- | ---------- | ----- |
| GET    | /users | Get all users | True       | Admin |

#### Get user by username

| Method | URL               | Description          | Need token | Roles |
| ------ | ----------------- | -------------------- | ---------- | ----- |
| GET    | /users/{username} | Get user by username | True       | Admin |

#### Get own user

| Method | URL       | Description  | Need token | Roles |
| ------ | --------- | ------------ | ---------- | ----- |
| GET    | /users/me | Get own user | True       | User  |

#### Update user

| Method | URL               | Description | Need token | Roles |
| ------ | ----------------- | ----------- | ---------- | ----- |
| PATCH  | /users/{username} | Update user | True       | Admin |

**Request**  

```json
{
  "username": "string",
  "password": "string"
}
```

#### Update own user

| Method | URL       | Description     | Need token | Roles |
| ------ | --------- | --------------- | ---------- | ----- |
| PATCH  | /users/me | Update own user | True       | User  |

**Request**  

```json
{
  "username": "string"
}
```

#### Update user password

| Method | URL                | Description          | Need token | Roles |
| ------ | ------------------ | -------------------- | ---------- | ----- |
| PATCH  | /users/me/password | Update user password | True       | User  |

**Request**  

```json
{
  "password": "string",
  "confirm_password": "string"
}
```

#### Delete user

| Method | URL               | Description | Need token | Roles |
| ------ | ----------------- | ----------- | ---------- | ----- |
| DELETE | /users/{username} | Delete user | True       | Admin |

### IPv4

#### Get IPv4 class

| Method | URL              | Description    | Need token | Roles |
| ------ | ---------------- | -------------- | ---------- | ----- |
| GET    | /ipv4/class/{ip} | Get IPv4 class | True       | User  |

#### Convert dec to bin

| Method | URL                    | Description        | Need token | Roles |
| ------ | ---------------------- | ------------------ | ---------- | ----- |
| GET    | /ipv4/dec-to-bin/{dec} | Convert dec to bin | True       | User  |

#### Convert dec to hex

| Method | URL                    | Description        | Need token | Roles |
| ------ | ---------------------- | ------------------ | ---------- | ----- |
| GET    | /ipv4/dec-to-hex/{dec} | Convert dec to hex | True       | User  |

#### Convert hex to dec

| Method | URL                    | Description        | Need token | Roles |
| ------ | ---------------------- | ------------------ | ---------- | ----- |
| GET    | /ipv4/hex-to-dec/{hex} | Convert hex to dec | True       | User  |

#### Convert bin to dec

| Method | URL                    | Description        | Need token | Roles |
| ------ | ---------------------- | ------------------ | ---------- | ----- |
| GET    | /ipv4/bin-to-dec/{bin} | Convert bin to dec | True       | User  |

#### Get CIDR notation

| Method | URL             | Description       | Need token | Roles |
| ------ | --------------- | ----------------- | ---------- | ----- |
| GET    | /ipv4/cidr/{ip} | Get CIDR notation | True       | User  |

#### Get mask

| Method | URL             | Description | Need token | Roles |
| ------ | --------------- | ----------- | ---------- | ----- |
| GET    | /ipv4/mask/{ip} | Get mask    | True       | User  |

#### Get VLSM

| Method | URL             | Description | Need token | Roles |
| ------ | --------------- | ----------- | ---------- | ----- |
| GET    | /ipv4/vlsm/{ip} | Get VLSM    | True       | User  |

### IPv6

#### Simplify IPv6

| Method | URL                   | Description   | Need token | Roles |
| ------ | --------------------- | ------------- | ---------- | ----- |
| GET    | /ipv6/simplify/{ipv6} | Simplify IPv6 | True       | User  |

#### Extend IPv6

| Method | URL                 | Description | Need token | Roles |
| ------ | ------------------- | ----------- | ---------- | ----- |
| GET    | /ipv6/extend/{ipv6} | Extend IPv6 | True       | User  |

### Scapy

#### Create ethernet frame

| Method | URL                                                  | Description           | Need token | Roles |
| ------ | ---------------------------------------------------- | --------------------- | ---------- | ----- |
| GET    | /scapy/ethernet-frame/{dst_mac}/{src_mac}/{eth_type} | Create ethernet frame | True       | User  |

#### TCP test

| Method | URL                                       | Description | Need token | Roles |
| ------ | ----------------------------------------- | ----------- | ---------- | ----- |
| GET    | /scapy/tcp-test/{target_ip}/{target_port} | TCP test    | True       | User  |

#### Ping

| Method | URL              | Description | Need token | Roles |
| ------ | ---------------- | ----------- | ---------- | ----- |
| GET    | /scapy/ping/{ip} | Ping        | True       | User  |

#### Get interfaces

| Method | URL               | Description                | Need token | Roles |
| ------ | ----------------- | -------------------------- | ---------- | ----- |
| GET    | /scapy/interfaces | Get interfaces of the host | True       | User  |
