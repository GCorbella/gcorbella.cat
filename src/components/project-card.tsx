import { getTranslations } from 'next-intl/server';
import { portfolioProject } from '@/content/projects';
import { Link } from '@/i18n/navigation';

export async function ProjectCard({ heading: Heading = 'h3' }: { heading?: 'h2' | 'h3' }) {
  const t = await getTranslations('PortfolioProject');

  return (
    <article className="project-card">
      <div>
        <Heading><Link href={`/projects/${portfolioProject.slug}`}>{t('title')}</Link></Heading>
        <p>{t('description')}</p>
        <ul className="technology-list" aria-label={t('technologies')}>
          {portfolioProject.technologies.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
      </div>
      <span className="project-arrow" aria-hidden="true">↗</span>
    </article>
  );
}
