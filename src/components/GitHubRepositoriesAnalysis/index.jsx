'use client';

import { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Label, Cell
} from 'recharts';
import styles from './GitHubRepositoriesAnalysis.module.css';

export default function GitHubRepositoriesAnalysis() {
  const [timelineData, setTimelineData] = useState([]);
  const [sizeData, setSizeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use fallback project colors (should match your CSS variables)
  const primaryColor = '#6366f1';
  const buttonColor = '#ec4899';

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
        
        {/* Timeline Chart */}
        <div className={styles.chartSection}>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={timelineData}
              margin={{ top: 20, right: 30, left: 60, bottom: 50 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="period"
                label={{
                  value: "Quarter",
                  position: "insideBottom",
                  offset: -10,
                  style: { fill: "var(--text-color)", fontSize: 14 }
                }}
                tick={{ fill: "var(--text-color)", fontSize: 13 }}
                interval={0}
                angle={0}
                dy={10}
              />
              <YAxis
                label={{
                  value: "Number of Repositories",
                  angle: -90,
                  position: "outsideLeft",
                  offset: 20,
                  style: { fill: "var(--text-color)", fontSize: 14 }
                }}
                tick={{ fill: "var(--text-color)", fontSize: 13 }}
                allowDecimals={false}
              />
              <Tooltip
                formatter={(value) => [`${value} repositories`, '']}
                contentStyle={{ background: "var(--card-bg)", border: "1px solid var(--card-shadow)", color: "var(--text-color)", fontSize: 13 }}
              />
              <Bar dataKey="count" fill={primaryColor} />
            </BarChart>
          </ResponsiveContainer>
          <div className={styles.chartDescription}>
            <p>Number of new repositories created per quarter since 2022</p>
          </div>
        </div>
        
        {/* Top 10 Largest Repositories */}
        <div className={styles.chartSection}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={sizeData}
              layout="vertical"
              margin={{ top: 20, right: 40, left: 60, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                label={{
                  value: "Size (KB)",
                  position: "insideBottom",
                  offset: -10,
                  style: { fill: "var(--text-color)", fontSize: 14 }
                }}
                tick={{ fill: "var(--text-color)", fontSize: 13 }}
                allowDecimals={false}
              />
              <YAxis
                dataKey="name"
                type="category"
                width={120}
                tick={{ fill: "var(--text-color)", fontSize: 13 }}
              />
              <Tooltip
                content={({ active, payload, label }) =>
                  active && payload && payload.length ? (
                    <div style={{
                      background: 'var(--card-bg)',
                      border: '1px solid var(--card-shadow)',
                      color: 'var(--text-color)',
                      fontSize: 13,
                      padding: 10
                    }}>
                      <p><strong>{label}</strong></p>
                      <p>Size: {payload[0].value} KB</p>
                      <p>Created: {sizeData.find(d => d.name === label)?.created}</p>
                      <p>Last updated: {sizeData.find(d => d.name === label)?.updated}</p>
                    </div>
                  ) : null
                }
              />
              <Bar dataKey="size" fill={buttonColor}>
                {sizeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={buttonColor} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
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