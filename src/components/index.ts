const globalsContext = require.context('./global', true, /index\.vue/);
globalsContext.keys().forEach(globalsContext);
