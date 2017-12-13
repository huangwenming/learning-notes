#!/bin/bash
gitpush='alias gitpush="_gitpush(){
         _gitbranch=`git symbolic-ref --short -q HEAD`;
         if [ '$_gitbranch' == 'master' ]
         then
             git push origin HEAD:refs/for/master
         else
             git push origin HEAD:refs/for/$_gitbranch;
         fi; };_gitpush"'
echo $gitpush >> ~/.bashrc
source ~/.bashrc