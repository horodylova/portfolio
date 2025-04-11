export async function GET(request) {
    const username = 'horodylova';
    const token = process.env.GITHUB_TOKEN;
    
    const headers = token ? { 
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json'
    } : {};
    
    try {
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&t=${Date.now()}`, { 
        headers,
        cache: 'no-store',
        next: { revalidate: 3600 } 
      });
      
      if (!reposResponse.ok) {
        throw new Error(`GitHub API error: ${reposResponse.status}`);
      }
      
      const repos = await reposResponse.json();
      
      console.log(`Found ${repos.length} repositories`);
      console.log(`Repositories from 2025: ${repos.filter(repo => new Date(repo.created_at).getFullYear() === 2025).length}`);
      
      return new Response(JSON.stringify(repos), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('Error fetching GitHub data:', error);
      return new Response(JSON.stringify({ error: error.message || 'Error during data retrieval from GitHub' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }