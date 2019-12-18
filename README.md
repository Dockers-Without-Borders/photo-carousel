# overviewGallery


### Setup

To start, run
```
npm install
```
To set up database in MySQL on Windows WSL under username [user], run
```
npm run build:database
```
Alternatively, to set up mySQL database, run
```
mysql -u [username] -p < ./database/schema.sql
```
To run the seeding script, run
```
npm run build:seed
```
To set up server, run
```
npm run dev:react
npm run dev:server
```

### Test

Test files are under ./spec, run tests with
```
npm run test
```

### API Routes

Create - '/api/photo-carousel/$locationId/$photoId'

Read - '/api/photo-carousel/$locationId/$photoId'

Update - '/api/photo-carousel/$locationId/$photoId'

Delete - '/api/photo-carousel/$locationId/$photoId'
