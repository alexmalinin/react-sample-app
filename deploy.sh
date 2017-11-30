#This script is for remote deploying react appications. It makes new build with "npm run build" and copying files over SSH.
#It should be placed at project root

user_to="deploy"
host="85.90.244.10"
app_name="react-dv"
path="~/www/$app_name"

red=`tput setaf 1`
keys () {
	echo "Your parameters: "
	echo "Application name: $app_name"
	echo "User: $user_to"
	echo "Host: $host"
}
while true; do
	keys
    read -p 'Are you sure you want to deploy new build?(Y/n): ' yn

    case $yn in

        [Yy]* )
        if ssh "$user_to"@"$host" "[ -d $path ]"; then
        	echo "$(tput setaf 1)Folder is not empty, removing all files!$(tput sgr0)"
        	ssh "$user_to"@"$host" "rm -rf $path/*"
            echo "Copying new build!"
            npm run build && scp -r build "$user_to"@"$host":"$path/" ;
        else
        	ssh "$user_to"@"$host" "mkdir -p $path"
        	npm run build && scp -r build "$user_to"@"$host":"$path/" ;
        fi
		echo "_______________________________________________________________________________________________________";
		echo "\n $(tput setaf 2)Done!!"
		echo "Dont forget to check server config!!"
         break;;

        [Nn]* ) exit;;

        * ) echo 'Please answer yes or no: ';;

    esac

done