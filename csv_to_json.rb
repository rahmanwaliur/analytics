require 'csv'
require 'json'

csv_files = File.join(File.dirname(__FILE__), 'data', 'CENSUS_COMMUNITY_DIST_2011.csv')
json_file = File.join(File.dirname(__FILE__), 'data', 'ages.js')


pupulation_data = {}

Dir.glob(csv_files).each do |csv_file|

  year = File.basename(csv_file)[-8..-5]
  CSV.foreach(csv_file, headers: true) do |row|
    community = row['NAME']
    pupulation_data[community] = {'MF_0_4' => row['MF_0_4'].to_i, 'MF_5_14' => row['MF_5_14'].to_i,'MF_15_19' => row['MF_15_19'].to_i, 'MF_20_24' => row['MF_20_24'].to_i, 'MF_25_34' => row['MF_25_34'].to_i, 'MF_35_44' => row['MF_35_44'].to_i, 'MF_45_54' => row['MF_45_54'].to_i, 'MF_55_64' => row['MF_55_64'].to_i, 'MF_65_74' => row['MF_65_74'].to_i, 'MF_75' => row['MF_75'].to_i};
  end

end

File.open(json_file, 'w') do |file|
  file.write(JSON.pretty_generate(pupulation_data))
end

