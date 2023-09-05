# Meteor Lempire test

# Project architecture
This project aims to follow the hexagonal architecture pattern.
All the core/business logic is located at `<ROOT_DIR>/imports/api/domain`.

# Prerequisites
## Versions
- MeteorJs: 2.11
- Nodejs: 14.0

# Configuration
### NodeJs
Execute the following command in order to use the right node version if you have nmv installed:
```bash
# It may required to install the specific node version if you haven't got yet 
nvm use
```

### MeteorJs
Execute the following command in order to install the meteorjs binary:
```bash
curl https://install.meteor.com/\?release\=<METEOR_VERSION> | sh
```

### Project dependencies
Execute the following command in order to install the project dependencies:
```bash
npm i
```

### Environment variables:
- MONGO_URL: Not required, all to connect meteorjs to another database than its local one. Must be in this [format](https://www.mongodb.com/docs/manual/reference/connection-string/)

# Test
Execute the following command in order to run tests:
```bash
npm run test
```

# Run
Execute the following command in order to run the server (web ui is available locally at http://localhost:3000/):
```bash
meteor run
```