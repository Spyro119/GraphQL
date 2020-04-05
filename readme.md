To run this on local, just do npm install, setup "Database_template.js" with
databases settings (and uncomment everything) then rename it for Database.js

Unfortunately, some connections in the queries couldn't be made since our database was poorly made and had issues with connections -- something we could fix in the future given time.


All queries starts with Fact intervention.
To search through factintervention id, type: 
fact(id: $int)

To get all facts, type: 
Facts

To search facts by employee id, type:
Fact(employeeid: $int

To search facts by buildings, type: 
FactBuilding(buildingid: $int)

There is all the information you can gather with Queries 

Fact(doesn't matter how you search it)
    start_date_and_time_if_intervention
    end_date_and_time_if_intervention
    result
    report
    status

    employee:
        id
        firstname
        lastname
        email
        function

    building:
        id
        building_administrator_full_name
        building_administrator_email
        building_administrator_phone
        building_technical_contact_full_name
        building_technical_contact_email
        building_technical_contact_phone
        customer:
            id
            company_name
            company_contact_name
            company_contact_email
            company_contact_phone
            company_description
            service_technical_authority_full_name
            service_technical_authority_email
            service_technical_authority_phone