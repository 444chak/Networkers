"use client";

import React from "react";
import "./Header.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "@/axiosConfig";
import { useEffect, useState } from "react";
interface HeaderProps {
  tabs: { [key: string]: string };
  activeTab: string;
  onClick: (tab: string) => void;
  onClickLogout: () => void;
  onClickLogo?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  tabs,
  activeTab,
  onClick,
  onClickLogout,
  onClickLogo,
}) => {
  const router = useRouter();
  const [role, setRole] = useState("");

  useEffect(() => {
    const getRole = async () => {
      try {
        const response = await axios.get("/users/me", {
          headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        });
        setRole(response.data.role);
      } catch {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        router.push("/");
      }
    };

    getRole();
  }, [router]);
  tabs = {
    ...tabs,
    ...(role == "admin" && { userManagement: "Gestion des utilisateurs" }),
  };
  return (
    <div className="header">
      <div className="header-logo">
        <Image
          quality={100}
          onClick={onClickLogo}
          src="/logo.png"
          alt="logo"
          width={100}
          height={160}
          style={{ width: "500", height: "auto" }}
        />
      </div>

      <div className="header-content">
        {Object.keys(tabs).map((tab) => (
          <div
            key={tab}
            className={`header-content-tab ${tab === activeTab ? "active" : ""}`}
            onClick={() => onClick(tab)}
          >
            {tabs[tab]}
          </div>
        ))}
        <div className="header-content logout">
          <svg
            width="1"
            height="52"
            viewBox="0 0 1 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="logout-line"
          >
            <line
              x1="0.5"
              y1="2.18557e-08"
              x2="0.499998"
              y2="52"
              stroke="#181B1F"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="58"
            height="58"
            viewBox="0 0 58 58"
            fill="none"
            className="logout-icon"
            onClick={onClickLogout}
          >
            <path
              d="M13.8021 6.07294C12.9235 6.07294 12.081 6.42193 11.4598 7.04315C10.8386 7.66436 10.4896 8.50691 10.4896 9.38544V43.6146C10.4896 44.4931 10.8386 45.3357 11.4598 45.9569C12.081 46.5781 12.9235 46.9271 13.8021 46.9271H26.9196C25.2076 44.5061 24.2874 41.6142 24.2855 38.6491C24.2836 35.6839 25.2 32.7909 26.9088 30.3676C28.6175 27.9443 31.0349 26.1097 33.8285 25.1158C36.6222 24.122 39.6551 24.0177 42.5104 24.8173V9.38544C42.5104 8.50691 42.1614 7.66436 41.5402 7.04315C40.919 6.42193 40.0764 6.07294 39.1979 6.07294H13.8021ZM18.7708 29.2604C18.3358 29.2604 17.9051 29.1748 17.5032 29.0083C17.1013 28.8418 16.7361 28.5978 16.4285 28.2902C16.1209 27.9826 15.8769 27.6175 15.7105 27.2156C15.544 26.8137 15.4583 26.3829 15.4583 25.9479C15.4583 25.5129 15.544 25.0822 15.7105 24.6803C15.8769 24.2784 16.1209 23.9132 16.4285 23.6056C16.7361 23.2981 17.1013 23.0541 17.5032 22.8876C17.9051 22.7211 18.3358 22.6354 18.7708 22.6354C19.6493 22.6354 20.4919 22.9844 21.1131 23.6056C21.7343 24.2269 22.0833 25.0694 22.0833 25.9479C22.0833 26.8265 21.7343 27.669 21.1131 28.2902C20.4919 28.9114 19.6493 29.2604 18.7708 29.2604ZM38.6458 50.7917C41.8671 50.7917 44.9564 49.512 47.2342 47.2343C49.512 44.9565 50.7916 41.8671 50.7916 38.6459C50.7916 35.4246 49.512 32.3352 47.2342 30.0575C44.9564 27.7797 41.8671 26.5 38.6458 26.5C35.4245 26.5 32.3352 27.7797 30.0574 30.0575C27.7796 32.3352 26.5 35.4246 26.5 38.6459C26.5 41.8671 27.7796 44.9565 30.0574 47.2343C32.3352 49.512 35.4245 50.7917 38.6458 50.7917ZM46.375 38.6459C46.375 38.9387 46.2586 39.2195 46.0516 39.4266C45.8445 39.6337 45.5637 39.75 45.2708 39.75H34.6863L38.3234 43.3849C38.5307 43.5923 38.6472 43.8735 38.6472 44.1667C38.6472 44.4599 38.5307 44.7411 38.3234 44.9484C38.1161 45.1558 37.8349 45.2722 37.5416 45.2722C37.2484 45.2722 36.9672 45.1558 36.7599 44.9484L31.2391 39.4276C31.1362 39.325 31.0547 39.2032 30.999 39.069C30.9433 38.9349 30.9147 38.7911 30.9147 38.6459C30.9147 38.5006 30.9433 38.3568 30.999 38.2227C31.0547 38.0885 31.1362 37.9667 31.2391 37.8641L36.7599 32.3433C36.9672 32.1359 37.2484 32.0195 37.5416 32.0195C37.8349 32.0195 38.1161 32.1359 38.3234 32.3433C38.5307 32.5506 38.6472 32.8318 38.6472 33.125C38.6472 33.4182 38.5307 33.6994 38.3234 33.9068L34.6863 37.5417H45.2708C45.5637 37.5417 45.8445 37.658 46.0516 37.8651C46.2586 38.0722 46.375 38.353 46.375 38.6459Z"
              fill="#181B1F"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Header;
