#!/bin/sh

# 使用方法
# zmall:  front_deploy.sh zmall-fe
# admin:  front_deploy.sh admin-fe

GIT_HOME=~/developer/git-repository/
DEST_PATH=~/developer/frontend/

#cd dir
if [ ! -n "$1" ];
    then
    echo -e "请输入要发布的项目！(zmall-fe || admin-fe)"
    exit
fi

if [ $1 = "zmall-fe" ];
    then
    echo -e "==========Enter zmall-fe============="
    cd $GIT_HOME$1

elif [ $1 = "admin-fe" ];
    then
    echo -e "==========Enter admin-fe============="
    cd $GIT_HOME$1

else
    echo -e "输入的项目名没有找到！"
    exit
fi

# clear git dist
echo -e "==========Clear Git Dist============="
rm -rf ./dist

echo -e "==========git checkout zmall_v1.0============="
git checkout zmall_v1.0

echo -e "==========git pull============="
git pull


echo -e "==========npm install============="
npm install --registry=https://registry.npm.taobao.org

echo -e "==========npm run dist============="
npm run dist

if [ -d "./dist" ];
    then
    echo -e "==========desk backup============="
    mv $DEST_PATH$1/dist $DEST_PATH$1/dist.back

    echo -e "==========copy============="
    cp -R ./dist $DEST_PATH$1

    echo -e "==========Deploy Success============="
else
    echo -e "==========Deploy Success============="
fi

