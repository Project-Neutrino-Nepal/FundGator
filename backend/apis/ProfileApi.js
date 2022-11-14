
// /**
//  * @description To Edit a User's Profile
//  * @api /users/api/edit-profile
//  * @access PRIVATE
//  * @type POST
//  */

router.post(
    "/api/edit-profile",
    async (req, res) => {
        try {
            let { name
                , email
                , phone,
                address,
                bio,
                status,
                skills,
                passport_No,
                passport_Issue_country,
                passport_Issue_date,
                passport_Expiry,
                tax_ID_No,
            } = req.body;
            let profile = await Profile.findOne({ user: req.user.id });
            if (!profile) {
                return res.status(400).json({
                    success: false,
                    message: "Profile not found",
                });
            }
            profile.name = name;
            profile.email = email;
            profile.phone = phone;
            profile.address = address;
            profile.bio = bio;
            profile.status = status;
            profile.skills = skills;
            profile.passport_No = passport_No;
            profile.passport_Issue_country = passport_Issue_country;
            profile.passport_Issue_date = passport_Issue_date;
            profile.passport_Expiry = passport_Expiry;
            profile.tax_ID_No = tax_ID_No;
            await profile.save();
            return res.status(200).json({
                success: true,
                message: "Profile Updated Successfully",
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "An error occurred.",
            });
        }
    }
);








