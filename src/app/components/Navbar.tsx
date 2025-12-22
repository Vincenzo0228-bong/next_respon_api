"use client";

import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Услуги 1");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const dropdownItems = [
    { value: "1", label: "Услуги 1" },
    { value: "2", label: "Услуги 2" },
    { value: "3", label: "Услуги 3" },
  ];

  return (
    <>
      <button 
        className={styles.mobileMenuToggle}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} />
      </button>
      {mobileMenuOpen && (
        <div 
          className={styles.mobileMenuOverlay}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      <nav className={`${styles.navbar} ${mobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <div className={styles.dropdown} ref={dropdownRef}>
          <a
            className={styles.dropdownBtn}
            onClick={(e) => {
              e.preventDefault();
              setDropdownOpen((open) => !open);
            }}
          >
            {selectedItem} ▼
          </a>
          {dropdownOpen && (
            <div className={styles.dropdownMenu}>
              {dropdownItems.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => {
                    setSelectedItem(item.label);
                    setDropdownOpen(false);
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <a href="#home" onClick={() => setMobileMenuOpen(false)}>О клинике</a>
        <a href="#about" onClick={() => setMobileMenuOpen(false)}>Команда</a>
        <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Цены</a>
        <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Результаты работ</a>
        <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Акции</a>
        <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Контакты</a>
      </nav>
    </>
  );
}
