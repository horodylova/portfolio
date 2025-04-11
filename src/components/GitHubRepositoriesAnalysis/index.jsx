'use client';

import { useEffect, useState, useRef } from 'react';
import {
  Chart,
  ChartTitle,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartValueAxis,
  ChartValueAxisItem,
  ChartLegend,
  ChartTooltip
} from '@progress/kendo-react-charts';
import '@progress/kendo-theme-default/dist/all.css';
import styles from './GitHubRepositoriesAnalysis.module.css';

export default function GitHubRepositoriesAnalysis() {
  const [timelineData, setTimelineData] = useState([]);
  const [sizeData, setSizeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [colors, setColors] = useState({
    primaryColor: '#6366f1',  
    buttonColor: '#ec4899'   
  });
  
   
  useEffect(() => {
   
    if (typeof window !== 'undefined') {
      const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
      const buttonColor = getComputedStyle(document.documentElement).getPropertyValue('--button-color').trim();
      setColors({ primaryColor, buttonColor });
    }
  }, []);

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        const response = await fetch('/api/github-stats');
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const repos = await response.json();
        
        const since2022 = repos.filter(repo => {
          const createdDate = new Date(repo.created_at);
          return createdDate.getFullYear() >= 2022;
        });
       
        const timelineMap = {};
        since2022.forEach(repo => {
          const date = new Date(repo.created_at);
          const quarter = Math.floor(date.getMonth() / 3) + 1;
          const period = `Q${quarter} ${date.getFullYear()}`;
          
          timelineMap[period] = (timelineMap[period] || 0) + 1;
        });
        
        const quarters = Object.keys(timelineMap).sort((a, b) => {
          const [q1, y1] = a.split(' ');
          const [q2, y2] = b.split(' ');
          return parseInt(y1) - parseInt(y2) || parseInt(q1.substring(1)) - parseInt(q2.substring(1));
        });
        
        const timelineProcessed = quarters.map(quarter => ({
          period: quarter,
          count: timelineMap[quarter]
        }));
        
        const sizeProcessed = since2022
          .map(repo => ({
            name: repo.name,
            size: repo.size, 
            created: new Date(repo.created_at).toLocaleDateString('en-GB'),
            updated: new Date(repo.updated_at).toLocaleDateString('en-GB')
          }))
          .sort((a, b) => b.size - a.size)
          .slice(0, 10);
        
        setTimelineData(timelineProcessed);
        setSizeData(sizeProcessed);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching GitHub data:', err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchGitHubData();
  }, []);

  if (loading) return <div className={styles.loading}>Loading repository data...</div>;
  if (error) return <div className={styles.error}>Failed to load repository data: {error}</div>;
  if (timelineData.length === 0 && sizeData.length === 0) 
    return <div className={styles.noData}>No repository data available since 2022</div>;

  return (
    <section id="github-analytics" className={styles.githubAnalyticsSection}>
      <div className={styles.githubAnalyticsContainer}>
        <h2 className={styles.analyticsTitle}>GitHub Repository Analytics</h2>
        
        <div className={styles.chartSection}>
          <Chart style={{ height: 350 }}>
            <ChartTitle text="Repository Creation Timeline (Since 2022)" />
            <ChartLegend position="bottom" />
            <ChartCategoryAxis>
              <ChartCategoryAxisItem categories={timelineData.map(item => item.period)} title={{ text: "Quarter" }} />
            </ChartCategoryAxis>
            <ChartValueAxis>
              <ChartValueAxisItem title={{ text: "Number of Repositories" }} />
            </ChartValueAxis>
            <ChartSeries>
              <ChartSeriesItem 
                type="column" 
                data={timelineData.map(item => item.count)} 
                name="New Repositories" 
                color={colors.primaryColor}
              />
            </ChartSeries>
            <ChartTooltip format="{0} repositories" />
          </Chart>
          <div className={styles.chartDescription}>
            <p>Number of new repositories created per quarter since 2022</p>
          </div>
        </div>
        
        <div className={styles.chartSection}>
          <Chart style={{ height: 400 }}>
            <ChartTitle text="Top 10 Largest Repositories" />
            <ChartLegend position="bottom" />
            <ChartCategoryAxis>
              <ChartCategoryAxisItem categories={sizeData.map(item => item.name)} title={{ text: "Repository" }} />
            </ChartCategoryAxis>
            <ChartValueAxis>
              <ChartValueAxisItem title={{ text: "Size (KB)" }} />
            </ChartValueAxis>
            <ChartSeries>
              <ChartSeriesItem 
                type="bar" 
                data={sizeData.map(item => item.size)} 
                name="Repository Size" 
                color={colors.buttonColor}
                labels={{
                  visible: true,
                  format: "{0} KB"
                }}
              />
            </ChartSeries>
            <ChartTooltip render={(e) => (
              e.point ? (
                <div>
                  <p><strong>{sizeData[e.point.index]?.name}</strong></p>
                  <p>Size: {e.point.value} KB</p>
                  <p>Created: {sizeData[e.point.index]?.created}</p>
                  <p>Last updated: {sizeData[e.point.index]?.updated}</p>
                </div>
              ) : null
            )} />
          </Chart>
          <div className={styles.chartDescription}>
            <p>Shows the top 10 largest repositories by size in kilobytes (KB)</p>
          </div>
        </div>
        
        <div className={styles.chartFootnote}>
          <p>Data sourced from GitHub API. Last updated: {new Date().toLocaleDateString('en-GB')}</p>
        </div>
      </div>
    </section>
  );
}