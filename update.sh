#!/bin/bash
 
read -r -p "Stop the search service from Suriyaa and pull fresh code from GitHub? (Y/n)" response
if ! [[ $response =~ ^([nN][oO]|[nN])$ ]]
then
	webservice stop
	cd ./public_html
	echo -e "\nUpdating the code for Wikimedia Tools..."
	git pull
	echo
	read -r -p "OK to start the service? (Y/n)" response
	if ! [[ $response =~ ^([nN][oO]|[nN])$ ]]
	then
		webservice start
	fi
fi
