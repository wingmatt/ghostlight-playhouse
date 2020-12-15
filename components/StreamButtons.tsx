import { gql, useQuery } from "@apollo/client";

export const ALL_PERFORMANCE_LINKS_QUERY = gql`
  query PerformanceLinks {
    products {
      edges {
        node {
          performanceDetails {
            performanceLinks {
              linkText
              linkUrl
            }
            performanceDate
          }
        }
      }
    }
  }
  `;

export default function StreamButtons() {
  const { loading, error, data } = useQuery(ALL_PERFORMANCE_LINKS_QUERY);
  const today = new Date().toLocaleDateString('en-US');
  if (error)
    return <div>Error loading buttons.</div>;
  if (loading)
    return <div>Loading</div>;
  if(data){
    const performances = data.products.edges;
    let todayPerformances = [];
    performances.forEach(performance => {
      let performanceDate = performance.node.performanceDetails.performanceDate;
      let performanceLinks = performance.node.performanceDetails.performanceLinks;
      if (today == performanceDate) {
        todayPerformances = todayPerformances.concat(performanceLinks);
      }
    });
    console.log(todayPerformances);
    return (
      <ul>
        {todayPerformances.map((link, index) => (
          <li key={`${index}_${link.linkUrl}_${link.linkText}`}><a href={link.linkUrl} target="blank">{link.linkText}</a></li>
        ))}
      </ul>
    );
  }
    
}