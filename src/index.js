import { createFilter } from 'rollup-pluginutils';
import gql from 'graphql-tag';

/**
 * Imports graphql documents as graphql-tag parsed ASTs
 * @param  {Object} [options={}]
 * @return {Object} 
 */
export default function graphql({ include, exclude } = {}) {
  // path filter
  const filter = createFilter(include, exclude);
  // only .graphql and .gql files
  const filterExt = /\.(graphql|gql)$/i;

  return {
    name: 'graphql',
    transform(source, id) {
      if (!filter(id)) return null;
      if (!filterExt.test(id)) return null;
      const code = `export default ${JSON.stringify(gql(source))};`;
      return { code };
    },
  };
}
