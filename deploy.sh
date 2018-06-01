#This script is for remote deploying react appications. It makes new build with "npm run build" and copying files over SSH.
#It should be placed at project root

user_to="dev"
host="85.90.244.10"
app_name="react-dv"
path="~/www/$app_name"

keys () {
	echo "$(tput setaf 2)Your parameters:$(tput sgr0) \nApp name: $(tput setaf 2)$app_name$(tput sgr0) \nUser: $(tput setaf 2)$user_to$(tput sgr0) \nHost: $(tput setaf 2)$host$(tput sgr0)"
}

keys #just show if you set everything up

while true; do
    read -p "$(tput setaf 6)Are you sure you want to deploy new build?(Y/n): $(tput sgr0)" yn

    case $yn in

        [Yy]* )
            keys
            npm run build && rsync -aP --delete build "$user_to"@"$host":"$path/"
		    echo "\n $(tput setaf 2)Done! Good luck!$(tput sgr0)"
            break;;

        [Nn]* ) echo "$(tput setaf 11) Goodbye :($(tput sgr0)"
                exit
                break
                ;;

        * ) echo "\n$(tput setaf 9)Please answer yes or no: $(tput sgr0)\n";;

    esac

done