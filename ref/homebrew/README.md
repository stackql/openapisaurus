## `homebrew` Provider Dev

### enrich spec

see bottom....

### `prep`

```
rm -rf dev/homebrew
rm -rf src/homebrew
servicesdir=dev/homebrew/v00.00.00000/services
mkdir -p $servicesdir
services=("formula")

for service in "${services[@]}"
do
  mkdir ${servicesdir}/${service}
  ./openapisaurus format ref/homebrew/${service}.yaml ${servicesdir}/${service}/${service}.yaml
  # cp ref/homebrew/${service}.yaml ${servicesdir}/${service}/${service}.yaml
done
```

### `dev`

```
./openapisaurus dev \
dev \
--providerName=homebrew \
--providerConfig='{ "auth": { "type": "null_auth" }}' \
--overwrite \
--verbose
```

### `build`

```
./openapisaurus build \
dev \
--providerName=homebrew \
--outputDir=src \
--overwrite \
--verbose
```

### `test`

```
PROVIDER_REGISTRY_ROOT_DIR="$(pwd)"
REG_STR='{"url": "file://'${PROVIDER_REGISTRY_ROOT_DIR}'", "localDocRoot": "'${PROVIDER_REGISTRY_ROOT_DIR}'", "verifyConfig": {"nopVerify": true}}'
./stackql shell --registry="${REG_STR}"
```

check views:

```
SELECT * FROM homebrew.formula.info
WHERE formula_name IN ('stackql', 'terraform');

SELECT * FROM homebrew.formula.versions
WHERE formula_name = 'stackql';

SELECT * FROM homebrew.formula.usage_metrics
WHERE formula_name IN ('stackql', 'terraform');

SELECT * FROM homebrew.formula.build_errors
WHERE formula_name = 'stackql';

SELECT * FROM homebrew.formula.dependencies
WHERE formula_name = 'stackql';

SELECT * FROM homebrew.formula.conflicts
WHERE formula_name = 'stackql';

SELECT * FROM homebrew.formula.lifecycle
WHERE formula_name = 'stackql';

SELECT * FROM homebrew.formula.urls 
WHERE formula_name = 'stackql';
```

### Run Test Suite

from the `stackql-provider-tests` directory:

```
cd ../stackql-provider-tests
sh test-provider.sh \
homebrew \
false \
/mnt/c/LocalGitRepos/stackql/openapisaurus \
true
```

## enrichments

add these descriptions to the fields in the response body for formula in the spec:

1. **name**: The unique name of the Homebrew formula.

2. **aliases**: Alternative names or aliases for the formula.

3. **analytics**: Analytics data related to the formula, such as download counts or build errors.

4. **bottle**: Details about the precompiled binary packages (bottles) for the formula, including URLs and checksums.

5. **build_dependencies**: Dependencies required to build the formula from source.

6. **caveats**: Special instructions or warnings about the formula that users should be aware of.

7. **conflicts_with**: Formula names that conflict with this formula, meaning they cannot be installed simultaneously.

8. **conflicts_with_reasons**: Reasons why the formula conflicts with other formulae.

9. **dependencies**: Dependencies required to run the formula.

10. **deprecated**: Whether the formula is deprecated, meaning it is no longer supported or maintained.

11. **deprecation_date**: The date on which the formula was deprecated, if it is deprecated.

12. **deprecation_reason**: The reason why the formula was deprecated, if it is deprecated.

13. **desc**: A short description of the formula.

14. **disable_date**: The date on which the formula was disabled, if it is disabled.

15. **disable_reason**: The reason why the formula was disabled, if it is disabled.

16. **disabled**: Whether the formula is disabled, meaning it is not available to install or use.

17. **full_name**: The full, qualified name of the formula including the tap name (if applicable).

18. **generated_date**: The date when the formula information was last generated or updated.

19. **head_dependencies**: Dependencies required for installing the HEAD version (directly from the source repository).

20. **homepage**: URL to the formula's homepage or project page.

21. **installed**: Versions of the formula that are currently installed.

22. **keg_only**: Whether the formula is keg-only, meaning it is not symlinked into the Homebrew prefix and can be accessed only by its fully qualified name.

23. **keg_only_reason**: The reason why the formula is keg-only, if it is keg-only.

24. **license**: The license under which the formula is distributed.

25. **link_overwrite**: File paths that this formula might request to overwrite during installation.

26. **linked_keg**: The version of the formula that is currently linked into Homebrews prefix.

27. **oldname**: Previous name for the formula, if it was renamed.

28. **oldnames**: All previous names the formula had.

29. **optional_dependencies**: Dependencies that are optional, meaning they are not required to run the formula.

30. **options**: Options that can be passed to the formula when installing it.

31. **outdated**: Whether the formula is outdated, meaning a newer version is available.

32. **pinned**: Whether the formula is pinned, meaning it is not upgraded when running `brew upgrade`.

33. **post_install_defined**: Whether a post-installation script is defined for the formula.

34. **recommended_dependencies**: Dependencies that are recommended, meaning they are not required to run the formula but are suggested for additional functionality.

35. **requirements**: Non-formula requirements for the formula, such as specific hardware or software conditions.

36. **revision**: The package revision number, used for versioning beyond the version number.

37. **ruby_source_checksum**: Checksum details for the Ruby source code of the formula.

38. **ruby_source_path**: The file path to the Ruby source code of the formula.

39. **service**: Details if the formula can run as a service or background process.

40. **tap**: The GitHub repository (tap) where the formula is located.

41. **tap_git_head**: The latest commit SHA of the tap repository containing the formula.

42. **test_dependencies**: Dependencies required for running the formulas tests.

43. **urls**: URLs related to the formula, such as the source URL.

44. **uses_from_macos**: Dependencies that are provided by macOS, which the formula can use.

45. **uses_from_macos_bounds**: The minimum and maximum macOS versions that the formula can use.

46. **variations**: Different variations of the formula, potentially for different operating systems or configurations.

47. **version_scheme**: Versioning scheme used by the formula.

48. **versioned_formulae**: Other versions of the formula available as separate formulae.

49. **versions**: The version numbers of the formula, including the stable, head, and bottle versions.