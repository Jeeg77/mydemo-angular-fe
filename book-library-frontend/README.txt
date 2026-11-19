- Modulo di frontend rappresentato da una pagina che da la possibilità di interagire con un backend java-spring-boot (mydemo-gradle) il quale espone api-rest
  per interagire con un catalogo di libri interno, su Elasticsearch,  ed un api-rest (/chat) per interfacciarsi con un modulo Python (mydemo-ai-service) il quale 
  gestisce sia la consultazione interna (elasticsearch) sia una consultazione esterna tramite interfacciamento con MCP per fare un match dei risultati ottenuti.
- E' un app in Angular e TypeScript
- Si avvia con lo start di npm: o tramite l'NPM Script (integrato in VS Code) o tramite il comando "npm run start"
- Risponde su http://localhost:4200/
- In proxy.conf.json è presente il puntamento al backend che deve essere pre-avviato e rispondere a http://localhost:8080