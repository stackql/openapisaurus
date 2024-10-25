### Test locally

```
export ANTHROPIC_API_KEY=sk-proj-xxx
PROVIDER_REGISTRY_ROOT_DIR="$(pwd)"
REG_STR='{"url": "file://'${PROVIDER_REGISTRY_ROOT_DIR}'", "localDocRoot": "'${PROVIDER_REGISTRY_ROOT_DIR}'", "verifyConfig": {"nopVerify": true}}'
./stackql shell --registry="${REG_STR}"
```

```
show services in anthropic;
show resources in anthropic.messages;
show methods in anthropic.messages.message;
describe extended anthropic.messages.message;

select * from anthropic.messages.message
where "anthropic-version" = '2023-06-01'
and data__model = 'claude-3-5-sonnet-20240620'
and data__max_tokens = 1024
and data__messages = '[{"role": "user", "content": "Hello, world"}]';
```