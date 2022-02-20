cyan="\033[38;2;100;255;200m"
yellow="\033[38;2;255;255;100m"
orange="\033[38;2;249;150;2m"
green="\033[38;2;100;255;100m"
reset="\033[0m"

config="src/config.ts"

echo "export default {" > $config

printf $cyan"\nWelcome to the uploadclient configure script.\n\n"$reset

# title
printf $yellow"Please enter the title (KekUpload): "$cyan
read title

echo "  title: '$title'," >> $config

# description
printf $yellow"Please enter the description (Upload everything): "$cyan
read description

echo "  description: '$description'," >> $config

# baseDownload
printf $yellow"Please enter the download base url (http://localhost:6942/e/): "$cyan
read baseDownload

echo "  baseDownload: '$baseDownload'," >> $config

# fileChunkSize
printf $yellow"Please enter the fileChunkSize in bytes (33554432): "$cyan
read fileChunkSize

echo "  fileChunkSize: $fileChunkSize," >> $config

# chunkSize
printf $yellow"Please enter the chunkSize in bytes (2097152): "$cyan
read chunkSize

echo "  chunkSize: $chunkSize," >> $config

# api_base
printf $yellow"Please enter the api base url (http://localhost:6942/api/): "$cyan
read api_base

echo "  api: { baseurl: '$api_base' }" >> $config

echo "};" >> $config

printf $cyan"\nuploadclient configure script finished.\n\n"$reset