import { typeDefs as imovelTypes, resolvers as imovelResolvers } from './imovel';


const versionTypes =  `type Query { version: String } type Mutation { setVersion: String }`

const typeDefs = [versionTypes, imovelTypes ]

// Object.assign( ) não é recursivo como o lodash.merge( )  e isso causa o override dos resolvers
// a solução foi usar o Object.assign( ) para Query e Mutation separadamente
const resolvers = {
    Query: Object.assign({}, imovelResolvers.Query),
    Mutation: Object.assign({}, imovelResolvers.Mutation)
}

export { typeDefs, resolvers }
