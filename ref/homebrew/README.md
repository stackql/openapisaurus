## `homebrew` Provider Dev

### enrich spec

enrich formula.yaml with field descriptions from [Homebrew Formula Cookbook](https://docs.brew.sh/Formula-Cookbook)

### `format`

move the `formula.yaml` file to the `dev/homebrew` directory:

```bash
rm -rf dev/homebrew
rm -rf src/homebrew
servicesdir=dev/homebrew/v00.00.00000/services
mkdir -p $servicesdir
services=("formula")

for service in "${services[@]}"
do
  mkdir ${servicesdir}/${service}
  ./openapisaurus format ref/homebrew/${service}.yaml ${servicesdir}/${service}/${service}.yaml
done
```

### `dev`

extract resources and methods from the `homebrew` provider spec:

```bash
./openapisaurus dev \
dev \
--providerName=homebrew \
--providerConfig='{ "auth": { "type": "null_auth" }}' \
--overwrite \
--verbose
```

### `build`

build the `homebrew` provider, including merging of view defined in `views/homebrew`:

```bash
./openapisaurus build \
dev \
--providerName=homebrew \
--outputDir=src \
--overwrite \
--verbose
```

### run test suite

from the `stackql-provider-tests` directory:

```bash
cd ../stackql-provider-tests
sh test-provider.sh \
homebrew \
false \
/mnt/c/LocalGitRepos/stackql/openapisaurus \
true
```

### inspect and test `homebrew` provider using the local registry

```bash
PROVIDER_REGISTRY_ROOT_DIR="$(pwd)"
REG_STR='{"url": "file://'${PROVIDER_REGISTRY_ROOT_DIR}'", "localDocRoot": "'${PROVIDER_REGISTRY_ROOT_DIR}'", "verifyConfig": {"nopVerify": true}}'
./stackql shell --registry="${REG_STR}"
```

check views:

```sql
SELECT * FROM homebrew.formula.vw_info
WHERE formula_name = 'stackql';

SELECT * FROM homebrew.formula.vw_info
WHERE formula_name IN ('stackql', 'terraform');

SELECT * FROM homebrew.formula.vw_versions
WHERE formula_name = 'stackql';

SELECT * FROM homebrew.formula.vw_versions
WHERE formula_name IN ('stackql', 'terraform');

SELECT * FROM homebrew.formula.vw_build_errors
WHERE formula_name = 'stackql';

SELECT * FROM homebrew.formula.vw_build_errors
WHERE formula_name IN ('stackql', 'terraform');

SELECT * FROM homebrew.formula.vw_usage_metrics
WHERE formula_name = 'stackql';

SELECT * FROM homebrew.formula.vw_usage_metrics
WHERE formula_name IN ('stackql', 'terraform');

SELECT * FROM homebrew.formula.vw_dependencies
WHERE formula_name = 'stackql';

SELECT * FROM homebrew.formula.vw_dependencies
WHERE formula_name IN ('stackql', 'terraform');

SELECT * FROM homebrew.formula.vw_conflicts
WHERE formula_name = 'stackql';

SELECT * FROM homebrew.formula.vw_conflicts
WHERE formula_name IN ('stackql', 'terraform');

SELECT * FROM homebrew.formula.vw_lifecycle
WHERE formula_name = 'stackql';

SELECT * FROM homebrew.formula.vw_lifecycle
WHERE formula_name IN ('stackql', 'terraform');

SELECT * FROM homebrew.formula.vw_urls 
WHERE formula_name = 'stackql';

SELECT * FROM homebrew.formula.vw_urls 
WHERE formula_name IN ('stackql', 'terraform');
```
