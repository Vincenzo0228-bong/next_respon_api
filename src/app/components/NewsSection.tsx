"use client";

import { useState, useEffect } from 'react';
import ImageSlider from './ImageSlider';

interface NewsItem {
  id: number;
  image: string;
  date: string;
  title: string;
  description: string;
}

const fallbackNews: NewsItem[] = [
  {
    id: 1,
    image: '/assets/img/pro_1.png',
    date: '27.03.2000г',
    title: 'Как подготовиться к протезированию зубов',
    description: 'Решаясь на такую процедуру, каждый пациент надеется, что зубной протез будет функциональным, удобным, эстетичным и прослужит долгие годы. При этом необходимо'
  },
  {
    id: 2,
    image: '/assets/img/pro_2.png',
    date: '27.03.2000г',
    title: 'Как подготовиться к протезированию зубов',
    description: 'Решаясь на такую процедуру, каждый пациент надеется, что зубной протез будет функциональным, удобным, эстетичным и прослужит долгие годы. При этом необходимо'
  },
  {
    id: 3,
    image: '/assets/img/pro_3.png',
    date: '27.03.2000г',
    title: 'Как подготовиться к протезированию зубов',
    description: 'Решаясь на такую процедуру, каждый пациент надеется, что зубной протез будет функциональным, удобным, эстетичным и прослужит долгие годы. При этом необходимо'
  },
  {
    id: 4,
    image: '/assets/img/pro_4.png',
    date: '27.03.2000г',
    title: 'Как подготовиться к протезированию зубов',
    description: 'Решаясь на такую процедуру, каждый пациент надеется, что зубной протез будет функциональным, удобным, эстетичным и прослужит долгие годы. При этом необходимо'
  },
  {
    id: 5,
    image: '/assets/img/pro_4.png',
    date: '27.03.2000г',
    title: 'Как подготовиться к протезированию зубов',
    description: 'Решаясь на такую процедуру, каждый пациент надеется, что зубной протез будет функциональным, удобным, эстетичным и прослужит долгие годы. При этом необходимо'
  }
];

export default function NewsSection() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>(fallbackNews);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        // Using JSONPlaceholder as a mock API for posts
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
        
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        
        const posts = await response.json();
        
        // Map the API data to our NewsItem format
        const images = [
          '/assets/img/pro_1.png',
          '/assets/img/pro_2.png',
          '/assets/img/pro_3.png',
          '/assets/img/pro_4.png',
          '/assets/img/pro_4.png'
        ];
        
        const mappedNews = posts.map((post: any, index: number) => ({
          id: post.id,
          image: images[index % images.length],
          date: new Date().toLocaleDateString('ru-RU', { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit' 
          }).replace(/\//g, '.') + 'г',
          title: post.title.length > 50 ? post.title.substring(0, 50) + '...' : post.title,
          description: post.body.length > 150 ? post.body.substring(0, 150) + '...' : post.body
        }));
        
        setNewsItems(mappedNews);
      } catch (error) {
        console.error('Error fetching news:', error);
        // Keep fallback data if API fails
      } finally {
        setIsLoading(false);
      }
    }

    fetchNews();
  }, []);
  
  if (isLoading) {
    return <ImageSlider newsItems={fallbackNews} />;
  }
  
  return <ImageSlider newsItems={newsItems} />;
}

