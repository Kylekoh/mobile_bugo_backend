// Mongoose Models
const BugoData = require("../models/BugoData");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLScalarType,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
} = require("graphql");

const dateType = new GraphQLScalarType({
  name: "Date",
  description: "Data Type",
  serialize: (value) => {
    const date = new Date(value);
    if (date.toString() === "invalid Date") {
      return null;
    }
    return date;
  },
});

// BugoData Type
const BugoDataType = new GraphQLObjectType({
  name: "BugoData",
  fields: () => ({
    id: { type: GraphQLID },
    latePersonName: {
      type: GraphQLString,
    },
    age: {
      type: GraphQLInt,
    },
    mourner: {
      type: GraphQLString,
    },
    funeralHall: {
      type: GraphQLString,
    },
    binso: {
      type: GraphQLString,
    },
    funeralAddress: {
      type: GraphQLString,
    },
    imJongDate: {
      type: dateType,
    },
    balInDate: {
      type: dateType,
    },
    accountHolder: {
      type: GraphQLString,
    },
    bankName: {
      type: GraphQLString,
    },
    accountNumber: {
      type: GraphQLString,
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    bugoDatas: {
      type: new GraphQLList(BugoDataType),
      resolve(parent, args) {
        return BugoData.find();
      },
    },
  },
});

//Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addBugoData: {
      type: BugoDataType,
      args: {
        latePersonName: {
          type: GraphQLNonNull(GraphQLString),
        },
        age: {
          type: GraphQLNonNull(GraphQLInt),
        },
        mourner: {
          type: GraphQLNonNull(GraphQLString),
        },
        funeralHall: {
          type: GraphQLNonNull(GraphQLString),
        },
        binso: {
          type: GraphQLNonNull(GraphQLString),
        },
        funeralAddress: {
          type: GraphQLNonNull(GraphQLString),
        },
        imJongDate: {
          type: GraphQLNonNull(dateType),
        },
        balInDate: {
          type: GraphQLNonNull(dateType),
        },
        accountHolder: {
          type: GraphQLNonNull(GraphQLString),
        },
        bankName: {
          type: GraphQLNonNull(GraphQLString),
        },
        accountNumber: {
          type: GraphQLNonNull(GraphQLString),
        },
      },
      resolve(parent, args) {
        const bugoData = new BugoData({
          latePersonName: args.latePersonName,
          age: args.age,
          mourner: args.mourner,
          funeralHall: args.funeralHall,
          binso: args.binso,
          funeralAddress: args.funeralAddress,
          imJongDate: args.imJongDate,
          balInDate: args.balInDate,
          accountHolder: args.accountHolder,
          bankName: args.bankName,
          accountNumber: args.accountNumber,
        });
        return bugoData.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
