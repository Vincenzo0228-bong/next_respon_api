"use client";

import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVectorPolygon, faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./test1.module.scss";
import Image from "next/image";
import Navbar from "../components/Navbar";
import NewsSection from "../components/NewsSection";

/**
 * Test1Page Component
 * 
 * Main page component featuring:
 * - Header section with brand info, logo, navigation, and toolbar
 * - Content section displaying value cards with images
 * - News/blog section with image slider
 * - Footer section with contact form
 * 
 * Key features:
 * - Form submission with AJAX simulation
 * - Phone number validation and auto-formatting
 * - Success/error message handling
 * - Responsive design for mobile devices
 */
export default function Test1Page() {
  // Form state management - stores user input for contact form
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    comment: "",
    agree: false
  });
  // Submission state - tracks if form is currently being submitted
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Message state - displays success or error messages after form submission
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error' | null; text: string }>({ type: null, text: "" });
  // Phone validation error state - shows validation errors for phone field
  const [phoneError, setPhoneError] = useState<string>("");

  /**
   * Phone Validation Function
   * Validates phone number format: +7 (423) 123-45-67
   * Uses regex pattern to ensure exact format match
   */
  const validatePhone = (phone: string): boolean => {
    // Format: +7 (423) 123-45-67
    const phoneRegex = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
    return phoneRegex.test(phone);
  };

  /**
   * Phone Formatting Function
   * Automatically formats phone input as user types
   * Handles inputs starting with 7, 8, or +7
   * Adds parentheses, spaces, and hyphens in correct positions
   */
  const formatPhone = (value: string): string => {
    // Remove all non-digit characters except +
    const digits = value.replace(/[^\d+]/g, '');
    
    // If it doesn't start with +7, add it
    if (!digits.startsWith('+7')) {
      if (digits.startsWith('7')) {
        return '+7' + digits.slice(1);
      }
      if (digits.startsWith('8')) {
        return '+7' + digits.slice(1);
      }
      return '+7' + digits;
    }
    
    // Format: +7 (XXX) XXX-XX-XX
    const cleaned = digits.slice(2); // Remove +7
    if (cleaned.length === 0) return '+7';
    if (cleaned.length <= 3) return `+7 (${cleaned}`;
    if (cleaned.length <= 6) return `+7 (${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    if (cleaned.length <= 8) return `+7 (${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    return `+7 (${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 8)}-${cleaned.slice(8, 10)}`;
  };

  /**
   * Input Change Handler
   * Handles all form input changes
   * Special handling for phone field: auto-formats and validates
   * Updates form state and phone error state accordingly
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'phone') {
      const formatted = formatPhone(value);
      setFormData(prev => ({
        ...prev,
        [name]: formatted
      }));
      
      // Validate phone format
      if (formatted.length > 0 && formatted.length < 18) {
        setPhoneError(""); // Clear error while typing
      } else if (formatted.length === 18) {
        if (!validatePhone(formatted)) {
          setPhoneError("Неверный формат телефона. Используйте формат: +7 (423) 123-45-67");
        } else {
          setPhoneError("");
        }
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  /**
   * Form Submit Handler
   * Simulates AJAX form submission
   * Validates phone number before submission
   * Shows success/error messages based on simulated API response
   * Resets form on successful submission
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate phone number before submission
    if (!validatePhone(formData.phone)) {
      setPhoneError("Неверный формат телефона. Используйте формат: +7 (423) 123-45-67");
      setSubmitMessage({
        type: 'error',
        text: 'Пожалуйста, введите корректный номер телефона в формате +7 (423) 123-45-67'
      });
      return;
    }
    
    setIsSubmitting(true);
    setSubmitMessage({ type: null, text: "" });
    setPhoneError("");

    // Simulated AJAX request
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulate random success/error (90% success rate for demo)
      const isSuccess = Math.random() > 0.1;

      if (isSuccess) {
        setSubmitMessage({
          type: 'success',
          text: 'Ваша заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.'
        });
        // Reset form
        setFormData({
          name: "",
          phone: "",
          email: "",
          comment: "",
          agree: false
        });
        setPhoneError("");
      } else {
        setSubmitMessage({
          type: 'error',
          text: 'Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.'
        });
      }
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        text: 'Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.test1}>
      {/* Header Section - Top navigation bar with brand info and main navigation */}
      <header className={styles.header}>
        {/* Brand Bar - Accessibility info and channel name */}
        <div className={styles.header_brand}>
          <div className={styles.brand_title}>
            <FontAwesomeIcon icon={faVectorPolygon} color="#887B61" style={{ float: 'left'}} />
            <p>Версия для слабовидящин</p>
          </div>
          <div className={styles.brand_name}>
            <p>Канал - MAX</p>
            <FontAwesomeIcon icon={faVectorPolygon} color="#887B61" style={{float: 'right' }} />
          </div>
        </div>
        {/* Main Navigation Bar - Logo, navigation menu, and toolbar (phone, search, button) */}
        <div className={styles.header_navbar}>
          <Image src="/assets/img/logo.png" alt="Logo" width={352} height={58} className={styles.logo} style={{float:'left', display: 'flex'}}/>
          <Navbar />
          {/* Toolbar - Phone number, search icon, and appointment button */}
          <div className={styles.toolbar}>
            <div className={styles.phone}>
              <p>+7 (423) 265-89-50</p>
            </div>
            <FontAwesomeIcon icon={faSearch} color="#887B61" style={{ fontSize: '26px', float: 'left' }} />
            <div className={styles.login}>
              <button>Записаться</button>
            </div>
          </div>
        </div>
      </header>
      {/* Main Content Section - Value cards and news section */}
      <div className={styles.content}>
        {/* Content Title - Section heading */}
        <div className={styles.content_title}>
          <p>Наши ценности</p>
        </div>
        {/* Contents Container - Grid of value cards */}
        <div className={styles.contents}>
          {/* Card Row - Contains two cards side by side */}
          <div className={styles.card_row}>
            {/* Card Component - Individual value card with number, content, and image */}
            <div className={styles.card}>
              {/* Card Number - Sequential number indicator (01, 02, etc.) */}
              <div className={styles.card_num}>
                <p>01</p>
              </div>
              {/* Card Content - Title and description text */}
              <div className={styles.card_content}>
                <h1>Стандарты сервиса</h1>
                <p>Каждый пациент достоин особого отношения к нему, вправе расчитывать на лечение у лучших докторов с применением новейших технологий и передовых методик</p>
              </div>
              {/* Card Image - Visual representation for the value */}
              <div className={styles.card_img}>
                <Image src="/assets/img/card_1.png" alt="Image 1" width={400} height={300} />
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.card_num}>
                <p>02</p>
              </div>
              <div className={styles.card_content}>
                <h1>Современные технологии</h1>
                <p>Каждый пациент достоин особого отношения к нему, вправе расчитывать на лечение у лучших докторов с применением новейших технологий и передовых методик</p>
              </div>
              <div className={styles.card_img}>
                <Image src="/assets/img/card_2.png" alt="Image 1" width={400} height={300} />
              </div>
            </div>
          </div>
          <div className={styles.card_row}>
            <div className={styles.card}>
              <div className={styles.card_num}>
                <p>03</p>
              </div>
              <div className={styles.card_content}>
                <h1>Квалифицированные доктора</h1>
                <p>Каждый пациент достоин особого отношения к нему, вправе расчитывать на лечение у лучших докторов с применением новейших технологий и передовых методик</p>
              </div>
              <div className={styles.card_img}>
                <Image src="/assets/img/card_3.png" alt="Image 1" width={400} height={300} />
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.card_num}>
                <p>04</p>
              </div>
              <div className={styles.card_content}>
                <h1>Забота о детях</h1>
                <p>Каждый пациент достоин особого отношения к нему, вправе расчитывать на лечение у лучших докторов с применением новейших технологий и передовых методик</p>
              </div>
              <div className={styles.card_img}>
                <Image src="/assets/img/card_4.png" alt="Image 1" width={400} height={300} />
              </div>
            </div>
          </div>
        </div>
        {/* News/Blog Section - Image slider with news items */}
        <div className={styles.slide}>
          {/* Slide Title - Section heading for news */}
          <div className={styles.slide_title}>
            <h1>Новости и блог</h1>
          </div>
          {/* Slide Content - Container for image slider component */}
          <div className={styles.slide_content}>
            <NewsSection/>
          </div>
          {/* All Publications Button - Link to view all publications */}
          <div className={styles.all_pub}>
            <button>Все публикации<p> &nbsp;(10) </p></button>
          </div>          
        </div>
      </div>
      {/* Footer Section - Contact form and brand information */}
      <div className={styles.footer}>
        {/* Footer Brand - Call-to-action text and description */}
        <div className={styles.footer_brand}>
          <p className={styles.brand_title}>
            Запишитесь <br/>к нам на прием
          </p>
          <p className={styles.brand_comment}>
            Просто свяжитесь с нашим администратором. <br/>Он быстро предоставит вам все необходимые данные и ответит на ваши вопросы.
          </p>
        </div>
        {/* Contact Form Section - User input form for appointments */}
        <div className={styles.contact}>
          <form className={styles.contact_form} onSubmit={handleSubmit}>
            {/* Submit Message - Success or error notification */}
            {submitMessage.type && (
              <div className={`${styles.submit_message} ${styles[submitMessage.type]}`}>
                {submitMessage.text}
              </div>
            )}
            {/* User Info Fields - Name, phone, and email inputs */}
            <div className={styles.user_info}>
              <div className={styles.form_group}>
                <label>Имя</label>
                <input 
                  type="text" 
                  name="name"
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles.form_group}>
                <label>Телефон</label>
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="+7 (423) 123-45-67"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={phoneError ? styles.input_error : ""}
                  required
                />
                {phoneError && (
                  <span className={styles.error_message}>{phoneError}</span>
                )}
              </div>
              <div className={styles.form_group}>
                <label>Почта</label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="Ваша Почта"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            {/* User Comment Field - Optional comment/note input */}
            <div className={styles.user_comment}>
              <div className={styles.form_group}>
                <label>Комментарий</label>
                <input 
                  type="text" 
                  name="comment"
                  placeholder="Ваш комментарий"
                  value={formData.comment}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {/* Submit Section - Submit button, privacy checkbox, and terms text */}
            <div className={styles.user_submit}>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
              </button>
              {/* Privacy Agreement Checkbox - Required consent checkbox */}
              <input 
                type="checkbox" 
                name="agree"
                checked={formData.agree}
                onChange={handleInputChange}
                required
              />
              <p>Заполняя и отправляя данную форму я соглашаюсь на обработку персональных данных в соответствии с политикой конфиденциальности сервиса</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
