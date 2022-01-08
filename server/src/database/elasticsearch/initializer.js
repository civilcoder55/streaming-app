// required packages
const client = require('./client')
const { errors } = require('@elastic/elasticsearch')

const body = {
  settings: {
    analysis: {
      filter: {
        autocomplete_filter: {
          type: 'edge_ngram',
          min_gram: 1,
          max_gram: 10
        }
      },
      analyzer: {
        autocomplete: {
          type: 'custom',
          tokenizer: 'standard',
          filter: ['lowercase', 'autocomplete_filter']
        },
        standard_stop: {
          type: 'standard',
          stopwords: '_english_'
        }
      }
    }
  },
  mappings: {
    properties: {
      id: { type: 'keyword' },
      title: {
        type: 'text',
        fields: {
          keyword: {
            type: 'keyword'
          }
        }
      },
      duration: {
        enabled: false
      },
      poster: {
        enabled: false
      },
      cover: {
        enabled: false
      },
      rate: {
        type: 'double'
      },
      country: {
        type: 'keyword'
      },
      description: {
        type: 'text',
        analyzer: 'standard_stop'
      },
      year: {
        type: 'date',
        format: 'yyyy'
      },
      genres: {
        type: 'keyword'
      }
    }
  }
}

module.exports = async function () {
  try {
    const indexExist = await client.indices.exists({ index: 'movies' })
    if (indexExist.body) {
      console.log('[*] elasticsearch up and index exists')
    } else {
      await client.indices.create({ index: 'movies', body })
      console.log('[*] Index Mapping Created Successfully')
    }
  } catch (error) {
    if (error instanceof errors.ConnectionError) {
      return console.error('Elastic search is offline')
    }
    return console.error(error)
  }
}
