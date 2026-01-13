FROM node:24.11.0-alpine AS base
RUN mkdir -p /opt/app
WORKDIR /opt/app
RUN chown -R node:node /opt/app
COPY package*.json ./

# BUILD TARGET
FROM base AS build
RUN npm install
COPY --chown=node:node . ./
RUN npm run build

# DEVELOPMENT TARGET PROFILE
FROM base AS development
RUN npm install
COPY --chown=node:node . .
USER node
EXPOSE 9229
CMD ["sh"]

# PRODUCTION TARGET PROFILE
FROM base AS production
ENV NODE_ENV=production
COPY --chown=node:node package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy build output
COPY --chown=node:node --from=build /opt/app/dist /opt/app/dist

USER node
EXPOSE 9229
CMD ["node", "dist/main.js"]
