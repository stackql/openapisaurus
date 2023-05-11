servicesdir=dev/godaddy/v00.00.00000/services
mkdir -p $servicesdir

service=aftermarket
mkdir ${servicesdir}/${service}
cp ref/godaddy/${service}.yaml ${servicesdir}/${service}/${service}.yaml

service=certificates
mkdir ${servicesdir}/${service}
cp ref/godaddy/${service}.yaml ${servicesdir}/${service}/${service}.yaml

service=domains
mkdir ${servicesdir}/${service}
cp ref/godaddy/${service}.yaml ${servicesdir}/${service}/${service}.yaml

service=shoppers
mkdir ${servicesdir}/${service}
cp ref/godaddy/${service}.yaml ${servicesdir}/${service}/${service}.yaml

service=abuse
mkdir ${servicesdir}/${service}
cp ref/godaddy/${service}.yaml ${servicesdir}/${service}/${service}.yaml

service=agreements
mkdir ${servicesdir}/${service}
cp ref/godaddy/${service}.yaml ${servicesdir}/${service}/${service}.yaml

service=countries
mkdir ${servicesdir}/${service}
cp ref/godaddy/${service}.yaml ${servicesdir}/${service}/${service}.yaml

service=orders
mkdir ${servicesdir}/${service}
cp ref/godaddy/${service}.yaml ${servicesdir}/${service}/${service}.yaml

service=subscriptions
mkdir ${servicesdir}/${service}
cp ref/godaddy/${service}.yaml ${servicesdir}/${service}/${service}.yaml

./openapisaurus dev \
dev \
--providerName=godaddy \
--providerConfig='{ "auth": { "type": "bearer", "credentialsenvvar": "GODADDY_API_TOKEN" }}' \
--overwrite \
--verbose

