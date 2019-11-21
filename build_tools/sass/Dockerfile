FROM node

RUN npm i -g sass
ADD sass.bash /usr/bin
RUN chmod +x /usr/bin/sass.bash

ENTRYPOINT [ "/usr/bin/sass.bash" ]
