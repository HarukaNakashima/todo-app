//1.Add the Winston module with a require() function.
const winston = require('winston');
const { createLogger, format, transports } = require('winston');
//timezoneを日本時間に設定
const timezoned = () => {
    return new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Tokyo'
    });
}
//2.Creating Winston configuration object. Winston requires at least one transport to create a log. A transport is where the log is saved.
const logConfiguration = {
    //複数指定できる
    'transports': [
        //トランスポート先にコンソールを指定
        new winston.transports.Console(),
        //トランスポート先(logが保存される場所）を指定
        new winston.transports.File({
            level:'info',
            filename: 'logs/all.log'
        }),
        new winston.transports.File({
            level:'error',
            filename: 'logs/error.log'
        })
    ],
    format: winston.format.combine(
        winston.format.label({
            label: `Label🏷️`
        }),
        winston.format.timestamp({
           format: timezoned
       }), 
    //    winston.format.cli(),//CLTログフォーマットにする。現時点では使わないのでコメントアウトしています。
       winston.format.printf(info => `${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`),
    )
};

//3.Creating a logger and pass it to the Winston configuration object.
const logger = winston.createLogger(logConfiguration);
    // logger.jsのルーティングを確かめる手段として、コメントアウトして残しています。
    logger.info('Hello, Winston logger, some info!');
    logger.error('Hello, Winston logger, some error!');

 module.exports = logger;
