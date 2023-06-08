(window.onload = function() {
})();

function resetData()
{
    document.getElementById('date-st').value = null;
    document.getElementById('date-end').value = null;
    document.getElementById('career-data').innerHTML = null;
    document.getElementById('skill-data').value = null;
    document.getElementById('format-data').innerHTML = null;  
    clearCostData();  
}

function clearCostData()
{
    document.getElementById('sales-unit-price').value = null;
    document.getElementById('desired-salary').value = null;
    calcResultData();
     
}

function calcResultData()
{
    document.getElementById('year-earnings').innerHTML = null;    
    document.getElementById('year-cost').innerHTML = null;    
    document.getElementById('year-gp').innerHTML = null;  
}

function calcYearCost(desired_salary)
{
    // 年間交通費（12万）
    let travel_costs = 12;

    // 年間家財保険料（2万）
    let home_insurance = 2;
    
    // 更新費（24万:家賃12万の2ヶ月分）
    let renewal_fee = 24;

    // 固定コスト合計
    let fixed_cost = (travel_costs+home_insurance+renewal_fee);

    // 社会保険料
    let social_insurance = (desired_salary*0.15);

    // 想定残業代
    let overtime_pay = (desired_salary*0.1);

    return (Number(desired_salary)+social_insurance+overtime_pay+fixed_cost);
}

function calc()
{
    calcResultData();
    let sales_unit_price = document.getElementById('sales-unit-price').value;
    let desired_salary = document.getElementById('desired-salary').value;
    
    if (sales_unit_price && desired_salary) {
        if (!Number.isNaN(sales_unit_price) && !Number.isNaN(desired_salary)) {
            let year_earnings = Math.floor((sales_unit_price*12));
            let year_cost = Math.floor(calcYearCost(desired_salary));
            document.getElementById('year-earnings').innerHTML = year_earnings;    
            document.getElementById('year-cost').innerHTML = year_cost;   
            let dom_year_gp = document.getElementById('year-gp'); 
            let year_gp = (year_earnings-year_cost);

            dom_year_gp.style.color = '#000000';
            dom_year_gp.innerHTML = Math.floor(year_gp);
            if (year_gp < 0) {
                dom_year_gp.style.color = '#bb2d3b';
            }
        }
    }

}

function formatter(data)
{
    let output = document.getElementById('format-data');
    output.innerHTML = null;

    let format_data = '';
    let skill_list = data.split('/'); 
    
    if (isSeSkillData()) {
        skill_list.forEach(function(item){
            if (isNeedSkill(item)) {
                format_data += makeData(item);
            }
        });
    } else {
        skill_list.forEach(function(item){
            format_data += makeData(item);
        });
    }
    output.innerHTML = replaceLfBr(format_data);
}

function replaceLfBr(data)
{
    return data.trim().replace(/\n/g, '<br>');
}

function chengeFormat()
{
    formatter(document.getElementById('skill-data').value);
}

function isNeedSkill(data)
{
    let need_skill = ['言語', 'フレームワーク・APIなど', 'データベース'];
    let skill = data.split(']')[0].replace('[', '').trim();
    return need_skill.includes(skill);
}

function isSeSkillData()
{
    return document.getElementById('skill-data-type-se').checked;
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
        end.setMonth(end.getMonth() + 1)
        
        if (!Number.isNaN(st.getTime()) && !Number.isNaN(end.getTime())) {

            const diff = end - st;
            console.log(diff);
            const year = Math.floor(diff / 1000 / 60 / 60 / 24 / 30 / 12);
            const month = Math.floor(diff / 1000 / 60 / 60 / 24 / 30) % 12;
            console.log(year);
            console.log(month);

            if (year !== 0) {
                outputStr += `${year}年`;
            }

            if (month !== 0) {
                outputStr += `${(month)}ヶ月`;
            }

            if (diff <= 0) {
                outputStr = '<span style="color:red;">無効な範囲です</span>';
            }
        }
    }
    document.getElementById('career-data').innerHTML = outputStr;
}

window.onload = function () {
    document.getElementsByName('skill-data-type')[0].checked = true;
};