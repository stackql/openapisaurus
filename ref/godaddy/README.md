servicesdir=dev/godaddy/v00.00.00000/services
mkdir -p $servicesdir

services=("aftermarket" "certificates" "domains" "shoppers" "abuse" "agreements" "countries" "orders" "subscriptions")

for service in "${services[@]}"
do
  mkdir ${servicesdir}/${service}
  cp ref/godaddy/${service}.yaml ${servicesdir}/${service}/${service}.yaml
done

./openapisaurus dev \
dev \
--providerName=godaddy \
--providerConfig='{ "auth": { "type": "bearer", "credentialsenvvar": "GODADDY_API_KEY" }}' \
--overwrite \
--verbose

