deploy to bluemix

$cf target -s dev

$cf push SAPGlossary -m 1536M --hostname sapglossary-dev -d w3ibm.mybluemix.net
