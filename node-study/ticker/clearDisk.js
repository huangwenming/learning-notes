/**
 * @file 定时清理磁盘文件
 * @author hwm
 */
const schedule = require('node-schedule');
const {exec} = require('child_process');
const chalk = require('chalk');
const inquirer = require('inquirer');
const fs = require('fs');

/**
 * scheduleJob 规则参数讲解
 *  *  *  *  *  *
 ┬ ┬ ┬ ┬ ┬ ┬
 │ │ │ │ │ │
 │ │ │ │ │ └ day of week (0 - 7) (0 or 7 is Sun)
 │ │ │ │ └───── month (1 - 12)
 │ │ │ └────────── day of month (1 - 31)
 │ │ └─────────────── hour (0 - 23)
 │ └──────────────────── minute (0 - 59)
 └───────────────────────── second (0 - 59, OPTIONAL)
 */
const scheduleCronstyle = (time = '00 00 12 * * 1', dir) => {
    // 每周1，中午12:00:00，清空指定目录
    console.log('定时任务已开启*****\n');
    schedule.scheduleJob(time, () => {
        console.log('scheduleCronstyle:' + new Date());
        console.log(`start: clear disk: ${dir}`);
        clearDisk(dir);
        console.log(`end: clear disk: ${dir}`);
    });
};
const clearDisk = dir => {
    if (dir) {
        exec(`rm -rf ${dir}`, (err, stdout, stderr) => {
            if (err) {
                console.log(`${chalk.red(err)}`);
                process.exit();
            }
            console.log(`已完成一次定时任务：${new Date()}\n`);
        });
    }
};

const questions = [
    // 删除的目录
    {
        type: 'input',
        name: 'dir',
        message: 'input the full directory pathname, '
            + 'example: "/Users/huangwenming/hwm/home/htdocs/git/learning-notes/node-study/ticker/test"',
        validate: value => {
            return new Promise((resolve, reject) => {
                fs.stat(value.trim(), (err, stat) => {
                    resolve(stat || stat.isFile() ? true : false);
                });
            });
        }

    },
    // 定时时机
    {
        type: 'input',
        name: 'schedule',
        message: 'input the implement schedule, 格式"00-00-12-*-*-1" -> "秒-分-时—天(1-31)-月-星期几(0-7)"',
        validate: value => {
            if (value.trim()) {
                const times = value.split('-');
                return times.length === 6 ? true : false;
            }
        }
    }
];

inquirer.prompt(questions).then(answers => {
    const {dir, schedule} = answers;
    const time = schedule.split('-').join(' ');
    scheduleCronstyle(time, dir);
});
