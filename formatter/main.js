function resetData()
{
    document.getElementById('date-st').value = null;
    document.getElementById('date-end').value = null;
    document.getElementById('career-data').innerHTML = null;
    document.getElementById('skill-data').value = null;
    document.getElementById('format-data').innerHTML = null;
}

function formatter(data)
{
    let output = document.getElementById('format-data');
    output.innerHTML = null;

    let format_data = '';
    let skill_list = data.split('/'); 
    skill_list.forEach(function(item){
        if (isNeedSkill(item)) {
            format_data += makeData(item);
        }
    });
    
    output.innerHTML = replaceLfBr(format_data);
}

function replaceLfBr(data)
{
    return data.trim().replace(/\n/g, '<br>');
}

function isNeedSkill(data)
{
    let need_skill = ['言語', 'フレームワーク・APIなど', 'データベース'];
    let skill = data.split(']')[0].replace('[', '').trim();
    return need_skill.includes(skill);
}

function makeData(data)
{
    return '\n' + data.replace(/、/g, '\n')
    .replace('[', '\n[')
    .replace(']', ']\n');
}

function setCurrentDate()
{
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth()+1;
    const date = now.getDate();
    document.getElementById('date-end').value = `${year}/${month}/${date}`;
    calcCareer();
}

function calcCareer(position)
{
    let st = document.getElementById('date-st').value;
    let end = document.getElementById('date-end').value;
    let outputStr = '';

    if (st.includes('〜')) {
        st = st.replace('〜', '～')
    }

    if (position = 'st' && st.includes('～')) {
        let period = st.split('～');
        st = period[0];
        end = period[1];
        document.getElementById('date-st').value = period[0];
        document.getElementById('date-end').value = period[1];
    }

    if (st && end) {
        st = st.replace('年', '/').replace('月', '/');
        end = end.replace('年', '/').replace('月', '/');
        st = new Date(st);
        end = new Date(end);
        
        if (!Number.isNaN(st.getTime()) && !Number.isNaN(end.getTime())) {
    
            const diff = end - st;
            const year = Math.floor(diff / 1000 / 60 / 60 / 24 / 30 / 12);
            const month = Math.floor(diff / 1000 / 60 / 60 / 24 / 30) % 12;

            if (year !== 0) {
                outputStr += `${year}年`;
            }

            if (month !== 0) {
                outputStr += `${month}ヶ月`;
            }

            if (year == 0 && month == 0) {
                outputStr += "1ヶ月未満";
            }

            if (diff < 0) {
                outputStr = '<span style="color:red;">無効な範囲です</span>';
            }
        }
    }
    document.getElementById('career-data').innerHTML = outputStr;
}

