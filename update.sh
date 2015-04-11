#!/bin/bash

echo "Hi. I'm the update script for this project. Are you ready?"
read -r -p "Stop the search service from Suriyaa and pull fresh code from GitHub? (Y/n)" response
if ! [[ $response =~ ^([nN][oO]|[nN])$ ]]
then
	webservice stop
	cd ./public_html
	echo -e "\nUpdating the code for Wikimedia Tools..."
	git pull
	echo
	read -r -p "OK to start the webservice? (Y/n)" response
	if ! [[ $response =~ ^([nN][oO]|[nN])$ ]]
	then
		webservice start
	fi
fi
