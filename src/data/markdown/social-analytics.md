# Social Media Analytics Platform

A comprehensive analytics platform for social media metrics with advanced data visualization, real-time monitoring, and detailed reporting capabilities.

## Overview

This platform provides businesses and content creators with deep insights into their social media performance across multiple platforms. Built with Python Django backend and modern JavaScript frontend for scalable data processing and beautiful visualizations.

## Key Features

### Analytics Dashboard
- **Multi-Platform Integration**: Facebook, Twitter, Instagram, LinkedIn, TikTok
- **Real-time Monitoring**: Live social media metrics and engagement tracking
- **Custom Reports**: Automated report generation with scheduling
- **Competitor Analysis**: Benchmark against industry competitors
- **Sentiment Analysis**: AI-powered sentiment tracking for mentions
- **Influencer Tracking**: Monitor influencer partnerships and ROI

### Data Visualization
- **Interactive Charts**: D3.js powered dynamic visualizations
- **Custom Dashboards**: Drag-and-drop dashboard builder
- **Export Capabilities**: PDF, Excel, and image export options
- **Mobile Responsive**: Optimized for all device sizes
- **Real-time Updates**: Live data streaming and updates

## Technology Stack

### Backend Architecture
```python
# Django REST API with PostgreSQL
# models.py
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class SocialAccount(models.Model):
    PLATFORM_CHOICES = [
        ('facebook', 'Facebook'),
        ('twitter', 'Twitter'),
        ('instagram', 'Instagram'),
        ('linkedin', 'LinkedIn'),
        ('tiktok', 'TikTok'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    platform = models.CharField(max_length=20, choices=PLATFORM_CHOICES)
    account_id = models.CharField(max_length=100)
    account_name = models.CharField(max_length=200)
    access_token = models.TextField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['user', 'platform', 'account_id']

class SocialMetric(models.Model):
    account = models.ForeignKey(SocialAccount, on_delete=models.CASCADE)
    metric_type = models.CharField(max_length=50)  # followers, likes, shares, etc.
    value = models.BigIntegerField()
    date = models.DateField()
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['account', 'metric_type', 'date']
        indexes = [
            models.Index(fields=['account', 'date']),
            models.Index(fields=['metric_type', 'date']),
        ]

class Post(models.Model):
    account = models.ForeignKey(SocialAccount, on_delete=models.CASCADE)
    post_id = models.CharField(max_length=100)
    content = models.TextField()
    post_type = models.CharField(max_length=20)  # text, image, video, etc.
    published_at = models.DateTimeField()
    likes = models.IntegerField(default=0)
    shares = models.IntegerField(default=0)
    comments = models.IntegerField(default=0)
    reach = models.IntegerField(default=0)
    impressions = models.IntegerField(default=0)
    engagement_rate = models.FloatField(default=0.0)
    
    class Meta:
        unique_together = ['account', 'post_id']
```

### API Views and Serializers
```python
# views.py
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum, Avg, Count
from django.utils import timezone
from datetime import timedelta

class SocialMetricsViewSet(viewsets.ModelViewSet):
    serializer_class = SocialMetricSerializer
    
    def get_queryset(self):
        return SocialMetric.objects.filter(
            account__user=self.request.user
        )
    
    @action(detail=False, methods=['get'])
    def dashboard_summary(self, request):
        """Get summary metrics for dashboard"""
        end_date = timezone.now().date()
        start_date = end_date - timedelta(days=30)
        
        metrics = self.get_queryset().filter(
            date__range=[start_date, end_date]
        )
        
        summary = {
            'total_followers': metrics.filter(
                metric_type='followers'
            ).aggregate(Sum('value'))['value__sum'] or 0,
            
            'engagement_rate': metrics.filter(
                metric_type='engagement_rate'
            ).aggregate(Avg('value'))['value__avg'] or 0,
            
            'total_posts': Post.objects.filter(
                account__user=request.user,
                published_at__date__range=[start_date, end_date]
            ).count(),
            
            'top_performing_posts': self.get_top_posts(request.user, 5)
        }
        
        return Response(summary)
    
    @action(detail=False, methods=['get'])
    def growth_trends(self, request):
        """Get growth trends over time"""
        days = int(request.query_params.get('days', 30))
        end_date = timezone.now().date()
        start_date = end_date - timedelta(days=days)
        
        trends = self.get_queryset().filter(
            date__range=[start_date, end_date],
            metric_type='followers'
        ).values('date', 'account__platform').annotate(
            total_followers=Sum('value')
        ).order_by('date')
        
        return Response(list(trends))

class PostAnalyticsViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    
    def get_queryset(self):
        return Post.objects.filter(account__user=self.request.user)
    
    @action(detail=False, methods=['get'])
    def performance_analysis(self, request):
        """Analyze post performance patterns"""
        posts = self.get_queryset()
        
        # Analyze by post type
        by_type = posts.values('post_type').annotate(
            avg_engagement=Avg('engagement_rate'),
            avg_reach=Avg('reach'),
            count=Count('id')
        )
        
        # Analyze by time of day
        by_hour = posts.extra(
            select={'hour': 'EXTRACT(hour FROM published_at)'}
        ).values('hour').annotate(
            avg_engagement=Avg('engagement_rate'),
            count=Count('id')
        ).order_by('hour')
        
        return Response({
            'by_type': list(by_type),
            'by_hour': list(by_hour),
            'top_hashtags': self.get_top_hashtags(posts)
        })
```

### Data Collection Service
```python
# services/data_collector.py
import requests
from celery import shared_task
from django.conf import settings
from .models import SocialAccount, SocialMetric, Post

class SocialMediaAPI:
    def __init__(self, platform, access_token):
        self.platform = platform
        self.access_token = access_token
        self.base_urls = {
            'facebook': 'https://graph.facebook.com/v18.0',
            'instagram': 'https://graph.instagram.com/v18.0',
            'twitter': 'https://api.twitter.com/2',
            'linkedin': 'https://api.linkedin.com/v2'
        }
    
    def get_account_metrics(self, account_id):
        """Fetch account-level metrics"""
        if self.platform == 'facebook':
            return self._get_facebook_metrics(account_id)
        elif self.platform == 'instagram':
            return self._get_instagram_metrics(account_id)
        # Add other platforms...
    
    def _get_facebook_metrics(self, account_id):
        url = f"{self.base_urls['facebook']}/{account_id}"
        params = {
            'fields': 'followers_count,posts{likes.summary(true),comments.summary(true),shares}',
            'access_token': self.access_token
        }
        
        response = requests.get(url, params=params)
        if response.status_code == 200:
            return response.json()
        else:
            raise Exception(f"API Error: {response.status_code}")
    
    def get_posts(self, account_id, limit=100):
        """Fetch recent posts with engagement metrics"""
        if self.platform == 'facebook':
            return self._get_facebook_posts(account_id, limit)
        # Add other platforms...
    
    def _get_facebook_posts(self, account_id, limit):
        url = f"{self.base_urls['facebook']}/{account_id}/posts"
        params = {
            'fields': 'id,message,created_time,type,likes.summary(true),comments.summary(true),shares',
            'limit': limit,
            'access_token': self.access_token
        }
        
        response = requests.get(url, params=params)
        return response.json().get('data', [])

@shared_task
def collect_social_data():
    """Celery task to collect data from all connected accounts"""
    accounts = SocialAccount.objects.filter(is_active=True)
    
    for account in accounts:
        try:
            api = SocialMediaAPI(account.platform, account.access_token)
            
            # Collect account metrics
            metrics = api.get_account_metrics(account.account_id)
            save_metrics(account, metrics)
            
            # Collect posts
            posts = api.get_posts(account.account_id)
            save_posts(account, posts)
            
        except Exception as e:
            print(f"Error collecting data for {account}: {e}")

def save_metrics(account, metrics_data):
    """Save metrics to database"""
    today = timezone.now().date()
    
    SocialMetric.objects.update_or_create(
        account=account,
        metric_type='followers',
        date=today,
        defaults={'value': metrics_data.get('followers_count', 0)}
    )
```

### Frontend Data Visualization
```javascript
// components/AnalyticsDashboard.jsx
import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [dateRange, setDateRange] = useState('30');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [selectedPlatform, dateRange]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/social-metrics/dashboard_summary/?days=${dateRange}&platform=${selectedPlatform}`);
      const data = await response.json();
      setDashboardData(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="analytics-dashboard">
      <DashboardHeader 
        selectedPlatform={selectedPlatform}
        setSelectedPlatform={setSelectedPlatform}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
      
      <div className="dashboard-grid">
        <MetricCards data={dashboardData} />
        <FollowerGrowthChart data={dashboardData.growth_trends} />
        <EngagementChart data={dashboardData.engagement_data} />
        <PostPerformanceChart data={dashboardData.post_performance} />
        <PlatformDistribution data={dashboardData.platform_metrics} />
      </div>
    </div>
  );
};

// Advanced D3.js Visualization Component
const FollowerGrowthChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const g = svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Parse dates and sort data
    const parseDate = d3.timeParse("%Y-%m-%d");
    const processedData = data.map(d => ({
      ...d,
      date: parseDate(d.date)
    })).sort((a, b) => a.date - b.date);

    // Set up scales
    const xScale = d3.scaleTime()
      .domain(d3.extent(processedData, d => d.date))
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(processedData, d => d.total_followers)])
      .nice()
      .range([height, 0]);

    // Create line generator
    const line = d3.line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.total_followers))
      .curve(d3.curveMonotoneX);

    // Add axes
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%m/%d")));

    g.append("g")
      .call(d3.axisLeft(yScale).tickFormat(d3.format(".2s")));

    // Add the line
    g.append("path")
      .datum(processedData)
      .attr("fill", "none")
      .attr("stroke", "#4f46e5")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Add dots
    g.selectAll(".dot")
      .data(processedData)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("cx", d => xScale(d.date))
      .attr("cy", d => yScale(d.total_followers))
      .attr("r", 4)
      .attr("fill", "#4f46e5")
      .on("mouseover", function(event, d) {
        // Tooltip logic
        const tooltip = d3.select("body").append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);
        
        tooltip.transition()
          .duration(200)
          .style("opacity", .9);
        
        tooltip.html(`Date: ${d.date.toLocaleDateString()}<br/>Followers: ${d.total_followers.toLocaleString()}`)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 28) + "px");
      })
      .on("mouseout", function() {
        d3.selectAll(".tooltip").remove();
      });

  }, [data]);

  return (
    <div className="chart-container">
      <h3>Follower Growth Trend</h3>
      <svg ref={svgRef}></svg>
    </div>
  );
};
```

### Real-time Data Streaming
```javascript
// services/websocket.js
class AnalyticsWebSocket {
  constructor(userId) {
    this.userId = userId;
    this.socket = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
  }

  connect() {
    const wsUrl = `ws://localhost:8000/ws/analytics/${this.userId}/`;
    this.socket = new WebSocket(wsUrl);

    this.socket.onopen = () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.handleMessage(data);
    };

    this.socket.onclose = () => {
      console.log('WebSocket disconnected');
      this.attemptReconnect();
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  handleMessage(data) {
    switch (data.type) {
      case 'metric_update':
        this.updateMetrics(data.payload);
        break;
      case 'new_post':
        this.addNewPost(data.payload);
        break;
      case 'engagement_alert':
        this.showEngagementAlert(data.payload);
        break;
      default:
        console.log('Unknown message type:', data.type);
    }
  }

  updateMetrics(metrics) {
    // Update dashboard metrics in real-time
    const event = new CustomEvent('metricsUpdate', { detail: metrics });
    window.dispatchEvent(event);
  }

  attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
        this.connect();
      }, 1000 * this.reconnectAttempts);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
}

export default AnalyticsWebSocket;
```

## Advanced Analytics Features

### Sentiment Analysis
```python
# services/sentiment_analysis.py
from textblob import TextBlob
import nltk
from transformers import pipeline

class SentimentAnalyzer:
    def __init__(self):
        self.classifier = pipeline("sentiment-analysis", 
                                 model="cardiffnlp/twitter-roberta-base-sentiment-latest")
    
    def analyze_post_sentiment(self, text):
        """Analyze sentiment of a social media post"""
        # Clean the text
        cleaned_text = self.clean_text(text)
        
        # Use transformer model for more accurate results
        result = self.classifier(cleaned_text)[0]
        
        return {
            'sentiment': result['label'].lower(),
            'confidence': result['score'],
            'text_length': len(cleaned_text)
        }
    
    def analyze_comments_sentiment(self, comments):
        """Analyze sentiment of comments on a post"""
        if not comments:
            return {'positive': 0, 'negative': 0, 'neutral': 0}
        
        sentiments = []
        for comment in comments:
            sentiment = self.analyze_post_sentiment(comment['text'])
            sentiments.append(sentiment['sentiment'])
        
        return {
            'positive': sentiments.count('positive'),
            'negative': sentiments.count('negative'),
            'neutral': sentiments.count('neutral'),
            'total': len(sentiments)
        }
    
    def clean_text(self, text):
        """Clean text for sentiment analysis"""
        import re
        # Remove URLs, mentions, hashtags
        text = re.sub(r'http\S+|www\S+|https\S+', '', text, flags=re.MULTILINE)
        text = re.sub(r'@\w+|#\w+', '', text)
        return text.strip()
```

### Competitor Analysis
```python
# services/competitor_analysis.py
class CompetitorAnalyzer:
    def __init__(self):
        self.metrics_to_compare = [
            'followers_count', 'engagement_rate', 'post_frequency',
            'avg_likes', 'avg_comments', 'avg_shares'
        ]
    
    def compare_with_competitors(self, user_account, competitor_accounts):
        """Compare user's performance with competitors"""
        user_metrics = self.get_account_metrics(user_account)
        competitor_metrics = []
        
        for competitor in competitor_accounts:
            metrics = self.get_account_metrics(competitor)
            competitor_metrics.append({
                'account': competitor.account_name,
                'metrics': metrics
            })
        
        comparison = {}
        for metric in self.metrics_to_compare:
            user_value = user_metrics.get(metric, 0)
            competitor_values = [c['metrics'].get(metric, 0) for c in competitor_metrics]
            
            comparison[metric] = {
                'user_value': user_value,
                'competitor_avg': sum(competitor_values) / len(competitor_values) if competitor_values else 0,
                'user_rank': self.calculate_rank(user_value, competitor_values),
                'percentile': self.calculate_percentile(user_value, competitor_values)
            }
        
        return comparison
    
    def get_trending_hashtags(self, industry, timeframe='7d'):
        """Get trending hashtags in the industry"""
        # This would integrate with social media APIs to get trending data
        pass
    
    def benchmark_content_performance(self, user_posts, competitor_posts):
        """Benchmark content performance against competitors"""
        user_avg_engagement = sum(p.engagement_rate for p in user_posts) / len(user_posts)
        competitor_avg_engagement = sum(p.engagement_rate for p in competitor_posts) / len(competitor_posts)
        
        return {
            'user_avg_engagement': user_avg_engagement,
            'competitor_avg_engagement': competitor_avg_engagement,
            'performance_ratio': user_avg_engagement / competitor_avg_engagement if competitor_avg_engagement > 0 else 0
        }
```

## Data Processing Pipeline

### ETL Pipeline with Celery
```python
# tasks.py
from celery import Celery
from celery.schedules import crontab
import pandas as pd
from .services.data_collector import collect_social_data
from .services.sentiment_analysis import SentimentAnalyzer

app = Celery('social_analytics')

@app.task
def process_daily_analytics():
    """Daily task to process and aggregate analytics data"""
    # Collect fresh data from all platforms
    collect_social_data.delay()
    
    # Process sentiment analysis for new posts
    analyze_post_sentiments.delay()
    
    # Generate daily reports
    generate_daily_reports.delay()

@app.task
def analyze_post_sentiments():
    """Analyze sentiment for posts without sentiment data"""
    analyzer = SentimentAnalyzer()
    
    posts_without_sentiment = Post.objects.filter(sentiment_score__isnull=True)
    
    for post in posts_without_sentiment:
        sentiment = analyzer.analyze_post_sentiment(post.content)
        post.sentiment_score = sentiment['confidence']
        post.sentiment_label = sentiment['sentiment']
        post.save()

@app.task
def generate_weekly_report(user_id):
    """Generate comprehensive weekly report for user"""
    user = User.objects.get(id=user_id)
    accounts = SocialAccount.objects.filter(user=user, is_active=True)
    
    report_data = {
        'user': user.username,
        'period': 'weekly',
        'accounts': [],
        'summary': {}
    }
    
    for account in accounts:
        account_data = generate_account_report(account, days=7)
        report_data['accounts'].append(account_data)
    
    # Send report via email
    send_report_email.delay(user.email, report_data)

# Celery beat schedule
app.conf.beat_schedule = {
    'daily-analytics': {
        'task': 'tasks.process_daily_analytics',
        'schedule': crontab(hour=2, minute=0),  # Run at 2 AM daily
    },
    'weekly-reports': {
        'task': 'tasks.generate_weekly_reports',
        'schedule': crontab(hour=9, minute=0, day_of_week=1),  # Monday 9 AM
    },
}
```

## API Documentation

### REST API Endpoints
```python
# urls.py
from rest_framework.routers import DefaultRouter
from .views import (
    SocialAccountViewSet, SocialMetricsViewSet, 
    PostAnalyticsViewSet, ReportViewSet
)

router = DefaultRouter()
router.register(r'accounts', SocialAccountViewSet)
router.register(r'metrics', SocialMetricsViewSet)
router.register(r'posts', PostAnalyticsViewSet)
router.register(r'reports', ReportViewSet)

urlpatterns = router.urls
```

### API Response Examples
```json
{
  "dashboard_summary": {
    "total_followers": 15420,
    "engagement_rate": 3.2,
    "total_posts": 45,
    "growth_rate": 2.1,
    "top_performing_posts": [
      {
        "id": "123",
        "content": "Check out our new product!",
        "engagement_rate": 8.5,
        "likes": 340,
        "shares": 25
      }
    ],
    "platform_breakdown": {
      "facebook": {"followers": 8500, "engagement": 2.8},
      "instagram": {"followers": 4200, "engagement": 4.1},
      "twitter": {"followers": 2720, "engagement": 2.5}
    }
  }
}
```

## Security and Privacy

### Data Protection
```python
# security/encryption.py
from cryptography.fernet import Fernet
from django.conf import settings

class TokenEncryption:
    def __init__(self):
        self.cipher_suite = Fernet(settings.ENCRYPTION_KEY)
    
    def encrypt_token(self, token):
        """Encrypt social media access tokens"""
        return self.cipher_suite.encrypt(token.encode()).decode()
    
    def decrypt_token(self, encrypted_token):
        """Decrypt social media access tokens"""
        return self.cipher_suite.decrypt(encrypted_token.encode()).decode()

# Rate limiting
from django_ratelimit.decorators import ratelimit

@ratelimit(key='user', rate='100/h', method='GET')
def api_view(request):
    # API endpoint with rate limiting
    pass
```

## Testing

### Unit Tests
```python
# tests/test_analytics.py
from django.test import TestCase
from django.contrib.auth.models import User
from .models import SocialAccount, SocialMetric

class AnalyticsTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
        
        self.account = SocialAccount.objects.create(
            user=self.user,
            platform='facebook',
            account_id='123456789',
            account_name='Test Page'
        )
    
    def test_metric_creation(self):
        metric = SocialMetric.objects.create(
            account=self.account,
            metric_type='followers',
            value=1000,
            date='2024-01-01'
        )
        
        self.assertEqual(metric.value, 1000)
        self.assertEqual(metric.metric_type, 'followers')
    
    def test_dashboard_api(self):
        response = self.client.get('/api/metrics/dashboard_summary/')
        self.assertEqual(response.status_code, 200)
```

## Deployment

### Docker Configuration
```dockerfile
# Dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "social_analytics.wsgi:application"]
```

### Docker Compose
```yaml
# docker-compose.yml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/social_analytics
      - REDIS_URL=redis://redis:6379/0
    depends_on:
      - db
      - redis

  db:
    image: postgres:15
    environment:
      POSTGRES_DB: social_analytics
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  celery:
    build: .
    command: celery -A social_analytics worker -l info
    depends_on:
      - db
      - redis

volumes:
  postgres_data:
```

## Future Enhancements

- **AI-Powered Insights**: Machine learning for content optimization
- **Advanced Reporting**: Custom report builder with more visualization options
- **Mobile App**: React Native mobile application
- **White-label Solution**: Customizable platform for agencies
- **Integration Marketplace**: Third-party app integrations
- **Advanced Automation**: Automated posting and response suggestions

## Contributing

We welcome contributions! Please read our contributing guidelines and submit pull requests for improvements.

## License

This project is licensed under the MIT License.