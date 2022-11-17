#!/bin/sh

#MAINFILES=$(cd $TEMPLATE_DIR && ls main*.js)

#for MAINFILE in $MAINFILES
#do  
#    cat  $TEMPLATE_DIR/$MAINFILE | envsubst '${AUTH_SERVER}' > $HTML_DIR/$MAINFILE
#done

exec "$@"
