FROM mcr.microsoft.com/playwright:v1.44.1
# The chromium version must be updated with playwright container upgrade
ENV CHROME_PATH /ms-playwright/chromium-1117/chrome-linux/chrome

# Required to run as pwuser chromium sandbox security
USER pwuser
# Add package.json for each workspace
WORKDIR /app/elements/openlayers-core
COPY --chown=pwuser elements/openlayers-core/package.json .
WORKDIR /app/elements/openlayers-elements
COPY --chown=pwuser elements/openlayers-elements/package.json .
WORKDIR /app/elements/swisstopo-elements
COPY --chown=pwuser elements/swisstopo-elements/package.json .
WORKDIR /app
COPY --chown=pwuser package.json package-lock.json ./
# Clean install node_modules for root package + all workspaces
RUN npm ci
COPY --chown=pwuser . .

CMD npm run test
