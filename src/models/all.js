import { typeDefs as imovelTypes, resolvers as imovelResolvers } from './imovel';
import { typeDefs as proprietarioTypes, resolvers as proprietarioResolvers } from './proprietario';


const versionTypes =  `type Query { version: String } type Mutation { setVersion: String }`

const typeDefs = [versionTypes, imovelTypes, proprietarioTypes ]

// Object.assign( ) não é recursivo como o lodash.merge( )  e isso causa o override dos resolvers
// a solução foi usar o Object.assign( ) para Query e Mutation separadamente
const resolvers = {
    Query: Object.assign({}, imovelResolvers.Query, proprietarioResolvers.Query),
    Mutation: Object.assign({}, imovelResolvers.Mutation, proprietarioResolvers.Mutation)
}

export { typeDefs, resolvers }
