[CSS_BADGE]:https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white
[HTML_BADGE]:https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white
[JAVASCRIPT_BADGE]:https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E
# Gerador de Imagens com IA

![HTML][HTML_BADGE]
![CSS][CSS_BADGE]
![JAVASCRIPT][JAVASCRIPT_BADGE]

## API usada
O API usada no projeto é a da hugging face, você pode acessa-lá por  [aqui](https://huggingface.co/docs/inference-providers/tasks/text-to-image)

para usa-lá você precisa  criar uma conta para gerar seu token que dará sua chave de acesso, e a API é gratuita mas tem um limite mensal.

## como você pode usar o código?

```
git clone https://github.com/seu-usuario/gerador-de-imagem-IA.git
```
<strong>Muita atenção!</strong>

nessa parte do código abaixo você criara outro arquivo onde lá você colocará a chave da sua API, e esse arquivo não pode ser subido no github por questões de segurança

```
// no script.js
import { HUGGINGFACE_API_TOKEN } from "./token.js";

const API_KEY = HUGGINGFACE_API_TOKEN;
```
entendeu? você criara outro arquivo que tera sua chave da sua api fornecida no site da hugging face exclusivamente para você

```
// no token.js
const HUGGINGFACE_API_TOKEN = "seu-token";
```
