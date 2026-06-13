from homeassistant import config_entries
from homeassistant.data_entry_flow import FlowResult
import voluptuous as vol

DOMAIN = "swa8"

class SWA8ConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """إدارة واجهة ربط براند SWA8 بضغطة زر."""
    VERSION = 1

    async def async_step_user(self, user_input=None) -> FlowResult:
        if self._async_current_entries():
            return self.async_abort(reason="already_configured")

        if user_input is not None:
            return self.async_create_entry(title="SWA8 Intelligent Living", data={})

        return self.async_show_form(
            step_id="user",
            data_schema=vol.Schema({})
        )