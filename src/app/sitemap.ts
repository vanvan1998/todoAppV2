import { MetadataRoute } from 'next';
import { BASE_URL } from 'src/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1
    }
  ];
}
