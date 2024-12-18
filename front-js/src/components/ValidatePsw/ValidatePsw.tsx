import React from "react";
import "./ValidatePsw.scss";
import Text from "@/components/Text";

interface ValidatePswProps {
  password: string;
  checkhasNumber?: boolean;
  checkhasUpperCase?: boolean;
  checkhasLowerCase?: boolean;
  checkhasSpecial?: boolean;
  lengthRequired?: number;
}

const ValidatePsw: React.FC<ValidatePswProps> = ({
  password,
  lengthRequired = 8,
  checkhasNumber = true,
  checkhasUpperCase = true,
  checkhasLowerCase = true,
  checkhasSpecial = true,
}) => {
  const size = password.length >= lengthRequired;

  const hasNumber = (myString: string) => {
    return /\d/.test(myString);
  };

  const hasUpperCase = (myString: string) => {
    return /[A-Z]/.test(myString);
  };

  const hasLowerCase = (myString: string) => {
    return /[a-z]/.test(myString);
  };

  const hasSpecial = (myString: string) => {
    return /[^A-Za-z0-9]/.test(myString);
  };
  const validIcon: React.ReactNode = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M8.49992 16.586L4.70692 12.793C4.51832 12.6108 4.26571 12.51 4.00352 12.5123C3.74132 12.5146 3.49051 12.6198 3.3051 12.8052C3.11969 12.9906 3.01452 13.2414 3.01224 13.5036C3.00997 13.7658 3.11076 14.0184 3.29292 14.207L7.79292 18.707C7.98045 18.8945 8.23475 18.9998 8.49992 18.9998C8.76508 18.9998 9.01939 18.8945 9.20692 18.707L20.2069 7.707C20.3891 7.51839 20.4899 7.26579 20.4876 7.00359C20.4853 6.7414 20.3801 6.49058 20.1947 6.30518C20.0093 6.11977 19.7585 6.0146 19.4963 6.01232C19.2341 6.01004 18.9815 6.11084 18.7929 6.293L8.49992 16.586Z"
        fill="#1F903C"
      />
    </svg>
  );
  const invalidIcon: React.ReactNode = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M4.21011 4.387L4.29311 4.29301C4.4653 4.12083 4.6944 4.0174 4.93742 4.00212C5.18045 3.98683 5.4207 4.06075 5.61311 4.21L5.70711 4.29301L12.0001 10.585L18.2931 4.29301C18.3854 4.19749 18.4957 4.12131 18.6177 4.0689C18.7397 4.01649 18.8709 3.98891 19.0037 3.98775C19.1365 3.9866 19.2682 4.0119 19.3911 4.06218C19.514 4.11246 19.6256 4.18672 19.7195 4.28061C19.8134 4.3745 19.8876 4.48615 19.9379 4.60905C19.9882 4.73195 20.0135 4.86363 20.0124 4.99641C20.0112 5.12919 19.9836 5.26041 19.9312 5.38241C19.8788 5.50441 19.8026 5.61476 19.7071 5.707L13.4151 12L19.7071 18.293C19.8793 18.4652 19.9827 18.6943 19.998 18.9373C20.0133 19.1803 19.9394 19.4206 19.7901 19.613L19.7071 19.707C19.5349 19.8792 19.3058 19.9826 19.0628 19.9979C18.8198 20.0132 18.5795 19.9393 18.3871 19.79L18.2931 19.707L12.0001 13.415L5.70711 19.707C5.5185 19.8892 5.2659 19.99 5.0037 19.9877C4.74151 19.9854 4.49069 19.8802 4.30529 19.6948C4.11988 19.5094 4.01471 19.2586 4.01243 18.9964C4.01015 18.7342 4.11095 18.4816 4.29311 18.293L10.5851 12L4.29311 5.707C4.12093 5.53481 4.0175 5.30571 4.00222 5.06269C3.98694 4.81966 4.06085 4.57941 4.21011 4.387Z"
        fill="#FF3B30"
      />
    </svg>
  );

  return (
    <div className="validate-password">
      {lengthRequired > 0 && (
        <Text size="14px" icon={size ? validIcon : invalidIcon}>
          Le mot de passe doit contenir au moins {lengthRequired} caractères
        </Text>
      )}
      {checkhasNumber && (
        <Text size="14px" icon={hasNumber(password) ? validIcon : invalidIcon}>
          Le mot de passe doit contenir au moins un chiffre
        </Text>
      )}
      {checkhasUpperCase && (
        <Text
          size="14px"
          icon={hasUpperCase(password) ? validIcon : invalidIcon}
        >
          Le mot de passe doit contenir au moins une lettre majuscule
        </Text>
      )}
      {checkhasLowerCase && (
        <Text
          size="14px"
          icon={hasLowerCase(password) ? validIcon : invalidIcon}
        >
          Le mot de passe doit contenir au moins une lettre minuscule
        </Text>
      )}
      {checkhasSpecial && (
        <Text size="14px" icon={hasSpecial(password) ? validIcon : invalidIcon}>
          Le mot de passe doit contenir au moins un caractère spécial
        </Text>
      )}
    </div>
  );
};

export default ValidatePsw;
