// const joinMonster = require('join-monster').default
const graphql = require('graphql');
const _ = require('lodash');
const factintervention = require('../models/factintervention')
const adresses = require('../models/adress')
const employees = require('../models/employees')
const batteries = require('../models/battery')
// const buildings = require('../models/building')
const columns = require('../models/columns')
const elevators = require('../models/elevators')
const { db, con } = require('../Database')
const {
    GraphQLDate,
    GraphQLTime,
    GraphQLDateTime
  } = require('graphql-iso-date');

const { 
    GraphQLObjectType,
    GraphQLString, 
    GraphQLSchema, 
    GraphQLID,
    GraphQLList,
    GraphQLInt 
} = graphql;


const buildings = [];
con.query("SELECT * FROM buildings", (err, res) => {
    for (result of res) buildings.push(JSON.parse(JSON.stringify(result)));
    // console.log(buildings)   
})

const customers = [];
con.query("SELECT * FROM customers", (err, res) => {
    for (result of res) customers.push(JSON.parse(JSON.stringify(result)));
    // console.log(buildings)   
})



const FactinterventionType = new GraphQLObjectType({
    name:'fact',
    fields: () =>({
        id: { type: GraphQLID },
        employee: { 
            type: employeesType,
            resolve(parent, args){
                    return _.find(employee, {id: parent.employeeid})
                // return new Promise(function(resolve, reject){
                //     con.query(`SELECT * FROM employees WHERE id=${parent.employeeid}`, function(err, rows){   
                //         if(rows === undefined){
                //             reject(new Error("Error rows is undefined"));
                //         }else{
                //             resolve(rows);
                //         }
                //     })
                // })
            }
        },
        elevators: { 
            type: elevatorType,
            resolve(parent, args){
                    return _.find(elevators, {id: parent.elevatorid})
            }
        },
        building: {
            type: buildingType,
            resolve(parent, args){
                return _.find(buildings, {id: parent.buildingid})

        } 
    },
        start_date_and_time_if_intervention: {
            type: GraphQLDate
        },
        end_date_and_time_if_intervention: {
            type: GraphQLDate
        },
        result: { type: GraphQLString },
        report: { type: GraphQLString },
        status: { type: GraphQLString }
    })
});

const columnType = new GraphQLObjectType({
    name: 'column',
    fields: () => ({
        id: { type: GraphQLID }

    })
})

const batteriesType = new GraphQLObjectType({
    name: 'battery',
    fields: () => ({
        id: { type: GraphQLID }

    })
})

const buildingType = new GraphQLObjectType({
    name: 'building',
    fields: () => ({
        id: { type:GraphQLID },
        building_administrator_full_name: { type: GraphQLString },
        building_administrator_email: { type: GraphQLString },
        building_administrator_phone: { type: GraphQLString },
        building_technical_contact_full_name: { type: GraphQLString },
        building_technical_contact_email: { type: GraphQLString },
        building_technical_contact_phone: { type: GraphQLString },
        customer: {
            type: CustomerType,
            resolve(parent, args){
                return _.find(customers, {id: parent.customer_id})
        
            }
        }
    })
})

const CustomerType = new GraphQLObjectType({
    name: 'customer',
    fields: () => ({
        id: { type: GraphQLID },
        company_name: { type: GraphQLString },
        company_contact_name: { type: GraphQLString },
        company_contact_email: { type: GraphQLString },
        company_contact_phone: { type: GraphQLString },
        company_description: { type: GraphQLString },
        service_technical_authority_full_name: { type: GraphQLString },
        service_technical_authority_email: { type: GraphQLString },
        service_technical_authority_phone: { type: GraphQLString }
    })
})

const elevatorType = new GraphQLObjectType({
    name: 'elevator',
    fields: () => ({ 
    id: { type: GraphQLID }
    })
});

const employeesType = new GraphQLObjectType({
    name:'employee',
    fields: () =>({
        id: { type: GraphQLID },
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        email: { type: GraphQLString },
        function: { type: GraphQLString}
    }) 
});

const AdressesType = new GraphQLObjectType({
    name: 'adress',
    fields: () => ({
        id: { type:GraphQLID },
        adress_status: { type: GraphQLString },
        street_number: { type: GraphQLString },
        street_name: { type: GraphQLString },
        city: { type: GraphQLString },
        postal_code: { type: GraphQLInt },
        country: { type: GraphQLString }
    })
})

const employee = [];
con.query("SELECT * FROM employees", (err, res) => {
    for (result of res) employee.push(JSON.parse(JSON.stringify(result)));
})

const RootQuerry = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        fact: {
            type: FactinterventionType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                const query = `SELECT * FROM factinterventions WHERE id=$1`;
                const values = [args.id];
                return db
                .one(query, values)
                .then(res => res)
                .catch(err => err);
            }
        },
        Fact: {
            type: FactinterventionType,
            args: {employeeid: {type: GraphQLID}},
            resolve(parent, args){
                const query = `SELECT * FROM factinterventions WHERE employeeid=$1`;
                const values = [args.employeeid];
                return db
                .one(query, values)
                .then(res => res)
                .catch(err => err);
        }
    },
    FactBuilding: {
        type: FactinterventionType,
        args: {buildingid: {type: GraphQLID}},
        resolve(parent, args){
            const query = `SELECT * FROM factinterventions WHERE buildingid=$1`;
            const values = [args.buildingid];
            return db
            .one(query, values)
            .then(res => res)
            .catch(err => err);
    }
},
        employee: {
            type: employeesType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find(employee, {id: args.id})
            }
        },
        building: {
            type: buildingType,
            args: {id: {type: GraphQLID} },
            resolve(parent, args){
                return _.find( buildings, {id: args.id})
            }
        },
        facts: {
            type: new GraphQLList(FactinterventionType),
            resolve(parent, args){
                const query = `SELECT * FROM factinterventions as "factinterventions"`;
                const values = [args.id];
                return db
                .any(query, values)
                .then(res => res)
                .catch(err => err);
            }
        },
        employees: {
            type: new GraphQLList(employeesType),
            resolve(parent, args){
                return new Promise(function(resolve, reject){
                    con.query(`SELECT * FROM employees`, function(err, rows){                                                
                        if(rows === undefined){
                            reject(new Error("Error rows is undefined"));
                        }else{
                            resolve(rows);
                        }
                    })
                })
            }
                            
        }, 

        buildings: {
            type: new GraphQLList(buildingType),
            resolve(parent, args){
                return new Promise(function(resolve, reject){
                    con.query(`SELECT * FROM buildings`, function(err, rows){                                                
                        if(rows === undefined){
                            reject(new Error("Error rows is undefined"));
                        }else{
                            resolve(rows);
                        }
                    })
                })
            }
        },
        customers: {
            type: new GraphQLList(CustomerType),
            resolve(parent, args){
                return new Promise(function(resolve, reject){
                    con.query(`SELECT * FROM customers`, function(err, rows){                                                
                        if(rows === undefined){
                            reject(new Error("Error rows is undefined"));
                        }else{
                            resolve(rows);
                        }
                    })
                })
            }
        },
        elevators: {
            type: new GraphQLList(elevatorType),
            resolve(parent, args){
                return new Promise(function(resolve, reject){
                    con.query(`SELECT * FROM elevators`, function(err, rows){                                                
                        if(rows === undefined){
                            reject(new Error("Error rows is undefined"));
                        }else{
                            resolve(rows);
                        }
                    })
                })
            }
        },
        
    }
})


module.exports = new GraphQLSchema({
    query: RootQuerry
    // mutation: Mutation
});